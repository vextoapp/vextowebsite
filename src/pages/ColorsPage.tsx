import { useState, useRef } from 'react';
import { Camera, Upload, Download, Sun, Moon, Copy, Check } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

interface ExtractedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  percentage: number;
}

export default function ColorsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const extractColors = (imageData: ImageData, numColors: number = 6): ExtractedColor[] => {
    const pixels: number[][] = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      if (a > 128) {
        pixels.push([r, g, b]);
      }
    }

    const clusters = kMeansClustering(pixels, numColors);

    const colors = clusters.map((cluster) => {
      const r = Math.round(cluster.centroid[0]);
      const g = Math.round(cluster.centroid[1]);
      const b = Math.round(cluster.centroid[2]);
      const hex = rgbToHex(r, g, b);
      const percentage = (cluster.points.length / pixels.length) * 100;
      return { hex, rgb: { r, g, b }, percentage };
    });

    return colors.sort((a, b) => b.percentage - a.percentage);
  };

  const kMeansClustering = (
    pixels: number[][],
    k: number,
    maxIterations: number = 10
  ): { centroid: number[]; points: number[][] }[] => {
    let centroids = pixels
      .sort(() => Math.random() - 0.5)
      .slice(0, k)
      .map((p) => [...p]);

    for (let iter = 0; iter < maxIterations; iter++) {
      const clusters: { centroid: number[]; points: number[][] }[] = centroids.map((c) => ({
        centroid: c,
        points: [],
      }));

      pixels.forEach((pixel) => {
        let minDist = Infinity;
        let closestCluster = 0;
        centroids.forEach((centroid, i) => {
          const dist = euclideanDistance(pixel, centroid);
          if (dist < minDist) {
            minDist = dist;
            closestCluster = i;
          }
        });
        clusters[closestCluster].points.push(pixel);
      });

      centroids = clusters.map((cluster) => {
        if (cluster.points.length === 0) return cluster.centroid;
        const sum = cluster.points.reduce(
          (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
          [0, 0, 0]
        );
        return sum.map((s) => s / cluster.points.length);
      });
    }

    return centroids.map((centroid, i) => ({
      centroid,
      points: pixels.filter((pixel) => {
        let minDist = Infinity;
        let closestIdx = 0;
        centroids.forEach((c, idx) => {
          const dist = euclideanDistance(pixel, c);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });
        return closestIdx === i;
      }),
    }));
  };

  const euclideanDistance = (p1: number[], p2: number[]): number => {
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2)
    );
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  const processImage = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colors = extractColors(imageData);
    setExtractedColors(colors);
    setIsProcessing(false);

    savePalette(colors);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPreviewImage(e.target?.result as string);
        processImage(img);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');
    setPreviewImage(dataUrl);

    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    setIsCameraActive(false);

    setIsProcessing(true);
    const img = new Image();
    img.onload = () => processImage(img);
    img.src = dataUrl;
  };

  const savePalette = async (colors: ExtractedColor[]) => {
    await supabase.from('color_palettes').insert({
      colors: colors,
      source: isCameraActive ? 'camera' : 'upload',
    });
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadPalette = () => {
    const data = {
      colors: extractedColors.map((c) => ({
        hex: c.hex,
        rgb: c.rgb,
        percentage: c.percentage.toFixed(2),
      })),
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelpalette-palette-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getComplementary = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return rgbToHex(255 - r, 255 - g, 255 - b);
  };

  const themeToggle = (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-smooth"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppLayout
        appTitle="PixelPalette"
        appSubtitle="Real-world color extraction"
        rightButtons={themeToggle}
        maxWidth="xl"
      >
        <div className="space-y-8">
          {!extractedColors.length && !isCameraActive && (
            <>
              <div className="text-center py-8">
                <h2 className="mb-4">Extract Colors from Any Image</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Upload an image or take a photo to extract a professional color palette instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={openCamera}
                  className="cursor-pointer group border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-vexto-blue hover:bg-vexto-blue/5 transition-smooth"
                >
                  <div className="w-16 h-16 bg-vexto-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexto-blue/20 transition-smooth">
                    <Camera size={32} className="text-vexto-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Open Camera</h3>
                  <p className="text-gray-600">Take a live photo</p>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer group border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-vexto-blue hover:bg-vexto-blue/5 transition-smooth"
                >
                  <div className="w-16 h-16 bg-vexto-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexto-blue/20 transition-smooth">
                    <Upload size={32} className="text-vexto-blue" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Upload Image</h3>
                  <p className="text-gray-600">or drag and drop</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </>
          )}

          {isCameraActive && (
            <div className="space-y-4">
              <video ref={videoRef} className="w-full rounded-lg" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex justify-center gap-4">
                <Button onClick={capturePhoto} className="gap-2">
                  <Camera size={20} />
                  Capture Photo
                </Button>
                <Button
                  onClick={() => {
                    const stream = videoRef.current?.srcObject as MediaStream;
                    stream?.getTracks().forEach((track) => track.stop());
                    setIsCameraActive(false);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-vexto-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Extracting colors...</p>
            </div>
          )}

          {extractedColors.length > 0 && (
            <div className="space-y-6">
              {previewImage && (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full max-h-64 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Extracted Palette</h3>
                <div className="flex gap-2">
                  <Button onClick={downloadPalette} variant="secondary" size="sm" className="gap-2">
                    <Download size={16} />
                    Download
                  </Button>
                  <Button
                    onClick={() => {
                      setExtractedColors([]);
                      setPreviewImage(null);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    New Image
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {extractedColors.map((color, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-smooth"
                  >
                    <div
                      className="h-32 cursor-pointer relative group"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, index)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-smooth flex items-center justify-center">
                        {copiedIndex === index ? (
                          <Check className="text-white" size={32} />
                        ) : (
                          <Copy className="text-white opacity-0 group-hover:opacity-100 transition-smooth" size={24} />
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-sm font-medium mb-1">{color.hex.toUpperCase()}</div>
                      <div className="text-xs text-gray-600">
                        RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {color.percentage.toFixed(1)}% of image
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {extractedColors.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium mb-4">Color Harmony Suggestions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-medium mb-3">Complementary</div>
                      <div className="flex gap-2">
                        <div
                          className="w-16 h-16 rounded-lg border border-gray-200"
                          style={{ backgroundColor: extractedColors[0].hex }}
                        />
                        <div
                          className="w-16 h-16 rounded-lg border border-gray-200"
                          style={{ backgroundColor: getComplementary(extractedColors[0].hex) }}
                        />
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-medium mb-3">Dominant Colors</div>
                      <div className="flex gap-2">
                        {extractedColors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-16 h-16 rounded-lg border border-gray-200"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </AppLayout>
    </div>
  );
}
