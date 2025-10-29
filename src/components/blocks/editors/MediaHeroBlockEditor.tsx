'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image as ImageIcon, Video, Plus, Trash2, Upload, ChevronUp, ChevronDown } from 'lucide-react';

interface Slide {
  id: string;
  desktopImageId: string | null;
  desktopImageUrl: string | null;
  mobileImageId: string | null;
  mobileImageUrl: string | null;
}

interface MediaHeroBlockData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  backgroundType: 'image' | 'video' | 'slider';
  desktopImageId: string | null;
  desktopImageUrl: string | null;
  mobileImageId: string | null;
  mobileImageUrl: string | null;
  videoType: 'youtube' | 'vimeo' | 'upload';
  videoUrl: string;
  videoId: string | null;
  videoAutoplay: boolean;
  videoMuted: boolean;
  videoLoop: boolean;
  slides: Slide[];
  sliderAutoplay: boolean;
  sliderSpeed: number;
  sliderShowDots: boolean;
  sliderShowArrows: boolean;
  sliderTransition: 'fade' | 'slide';
  height: 'medium' | 'large' | 'full';
  contentAlignment: 'left' | 'center' | 'right';
  verticalAlignment: 'top' | 'center' | 'bottom';
  desktopImageFit: 'contain' | 'cover';
  desktopImagePosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
  mobileImageFit: 'contain' | 'cover';
  mobileImagePosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  textColor: string;
  titleSize: 'medium' | 'large' | 'xlarge';
  buttonStyle: 'solid' | 'outline' | 'ghost' | 'both';
  buttonColor: string;
  buttonTextColor: string;
  buttonSize: 'medium' | 'large';
  buttonTextBold: boolean;
  buttonBackgroundOpacity: number;
  animateContent: boolean;
  animationDelay: number;
  // Content visibility toggles
  showTitle: boolean;
  showSubtitle: boolean;
  showButton: boolean;
  // Custom positioning
  contentMaxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  contentPaddingX: 'none' | 'sm' | 'md' | 'lg';
  contentPaddingY: 'none' | 'sm' | 'md' | 'lg';
  // Fine-tuned positioning (percentage from top/left)
  customVerticalPosition?: number; // 0-100 (percentage from top)
  customHorizontalPosition?: number; // 0-100 (percentage from left)
  useCustomPosition?: boolean; // Enable custom positioning
  // Individual element positioning
  titleAlignment?: 'left' | 'center' | 'right';
  subtitleAlignment?: 'left' | 'center' | 'right';
  buttonAlignment?: 'left' | 'center' | 'right';
  // Text visibility controls
  textShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  textStroke?: boolean;
  textBackground?: boolean;
  textBackgroundOpacity?: number;
  titleFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  subtitleFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  // Button styling enhancements
  buttonBorderWidth?: number; // 1-5 px
  buttonBorderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

interface MediaHeroBlockEditorProps {
  data: MediaHeroBlockData;
  onChange: (data: MediaHeroBlockData) => void;
}

interface Media {
  id: string;
  path: string;
  originalName: string;
  mimeType: string;
}

export default function MediaHeroBlockEditor({ data, onChange }: MediaHeroBlockEditorProps) {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(null);

  const updateField = <K extends keyof MediaHeroBlockData>(
    field: K,
    value: MediaHeroBlockData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch('/api/admin/media?limit=50');
      const result = await response.json();
      setMediaList(result.media || []);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (showMediaLibrary) {
      fetchMedia();
    }
  }, [showMediaLibrary]);

  const openMediaLibrary = (field: string, slideIndex?: number) => {
    setCurrentImageField(field);
    setCurrentSlideIndex(slideIndex ?? null);
    setShowMediaLibrary(true);
  };

  const selectMedia = (media: Media) => {
    if (currentSlideIndex !== null) {
      const newSlides = [...data.slides];
      if (currentImageField === 'desktopImage') {
        newSlides[currentSlideIndex].desktopImageId = media.id;
        newSlides[currentSlideIndex].desktopImageUrl = media.path;
      } else if (currentImageField === 'mobileImage') {
        newSlides[currentSlideIndex].mobileImageId = media.id;
        newSlides[currentSlideIndex].mobileImageUrl = media.path;
      }
      updateField('slides', newSlides);
    } else {
      if (currentImageField === 'desktopImage') {
        updateField('desktopImageId', media.id);
        updateField('desktopImageUrl', media.path);
      } else if (currentImageField === 'mobileImage') {
        updateField('mobileImageId', media.id);
        updateField('mobileImageUrl', media.path);
      }
    }
    setShowMediaLibrary(false);
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      desktopImageId: null,
      desktopImageUrl: null,
      mobileImageId: null,
      mobileImageUrl: null,
    };
    updateField('slides', [...data.slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    const newSlides = data.slides.filter((_, i) => i !== index);
    updateField('slides', newSlides);
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...data.slides];
    if (direction === 'up' && index > 0) {
      [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
    } else if (direction === 'down' && index < newSlides.length - 1) {
      [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
    }
    updateField('slides', newSlides);
  };

  return (
    <div className="space-y-6">
      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Image from Media Library</h3>
              <Button variant="ghost" onClick={() => setShowMediaLibrary(false)}>✕</Button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {loadingMedia ? (
                <p className="text-center py-8">Loading media...</p>
              ) : mediaList.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No images found. Upload images in{' '}
                  <a href="/admin/media" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Media Library
                  </a>
                </p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaList
                    .filter((m) => m.mimeType.startsWith('image/'))
                    .map((media) => (
                      <button
                        key={media.id}
                        onClick={() => selectMedia(media)}
                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.path}
                          alt={media.originalName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">Select</span>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">📝 Content</h3>
        <div className="space-y-4">
          {/* Title */}
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">Title</Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showTitle !== false}
                  onChange={(e) => updateField('showTitle', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show</span>
              </label>
            </div>
            {(data.showTitle !== false) && (
              <Input
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Welcome to Our Store"
              />
            )}
          </div>

          {/* Subtitle */}
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">Subtitle</Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showSubtitle !== false}
                  onChange={(e) => updateField('showSubtitle', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show</span>
              </label>
            </div>
            {(data.showSubtitle !== false) && (
              <Input
                value={data.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Discover amazing products"
              />
            )}
          </div>

          {/* Button */}
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium">Button</Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showButton !== false}
                  onChange={(e) => updateField('showButton', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show</span>
              </label>
            </div>
            {(data.showButton !== false) && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    value={data.buttonText}
                    onChange={(e) => updateField('buttonText', e.target.value)}
                    placeholder="Shop Now"
                  />
                </div>
                <div>
                  <Label className="text-xs">Button URL</Label>
                  <Input
                    value={data.buttonUrl}
                    onChange={(e) => updateField('buttonUrl', e.target.value)}
                    placeholder="/products"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content Positioning */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-3">📐 Content Positioning</h4>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <Label className="text-xs">Max Width</Label>
                <select 
                  value={data.contentMaxWidth || 'lg'} 
                  onChange={(e) => updateField('contentMaxWidth', e.target.value as 'sm' | 'md' | 'lg' | 'xl' | 'full')} 
                  className="w-full px-2 py-1.5 border rounded text-sm"
                >
                  <option value="sm">Small (640px)</option>
                  <option value="md">Medium (768px)</option>
                  <option value="lg">Large (1024px)</option>
                  <option value="xl">XL (1280px)</option>
                  <option value="full">Full Width</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Padding X</Label>
                <select 
                  value={data.contentPaddingX || 'md'} 
                  onChange={(e) => updateField('contentPaddingX', e.target.value as 'none' | 'sm' | 'md' | 'lg')} 
                  className="w-full px-2 py-1.5 border rounded text-sm"
                >
                  <option value="none">None</option>
                  <option value="sm">Small (1rem)</option>
                  <option value="md">Medium (2rem)</option>
                  <option value="lg">Large (3rem)</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Padding Y</Label>
                <select 
                  value={data.contentPaddingY || 'md'} 
                  onChange={(e) => updateField('contentPaddingY', e.target.value as 'none' | 'sm' | 'md' | 'lg')} 
                  className="w-full px-2 py-1.5 border rounded text-sm"
                >
                  <option value="none">None</option>
                  <option value="sm">Small (1rem)</option>
                  <option value="md">Medium (2rem)</option>
                  <option value="lg">Large (3rem)</option>
                </select>
              </div>
            </div>

            {/* Custom Position Toggle */}
            <div className="border-t pt-3 mt-3">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={data.useCustomPosition || false}
                  onChange={(e) => updateField('useCustomPosition', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">🎯 Use Custom Position (Fine Control)</span>
              </label>

              {data.useCustomPosition && (
                <div className="space-y-3 pl-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-xs">Vertical Position</Label>
                      <span className="text-xs text-gray-500">{data.customVerticalPosition || 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={data.customVerticalPosition || 50}
                      onChange={(e) => updateField('customVerticalPosition', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Top</span>
                      <span>Center</span>
                      <span>Bottom</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-xs">Horizontal Position</Label>
                      <span className="text-xs text-gray-500">{data.customHorizontalPosition || 50}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={data.customHorizontalPosition || 50}
                      onChange={(e) => updateField('customHorizontalPosition', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Left</span>
                      <span>Center</span>
                      <span>Right</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 italic">
                    💡 Tip: Drag sliders to position content exactly where you want
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Background Type */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">🎨 Background Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'image', label: 'Image', icon: <ImageIcon className="w-5 h-5" /> },
            { value: 'video', label: 'Video', icon: <Video className="w-5 h-5" /> },
            { value: 'slider', label: 'Slider', icon: <span className="text-xl">🎞️</span> },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => updateField('backgroundType', type.value as 'image' | 'video' | 'slider')}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.backgroundType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {type.icon}
                <span className="font-medium text-sm">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Image Background */}
      {data.backgroundType === 'image' && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">🖼️ Background Images</h3>
          <div className="space-y-4">
            <div>
              <Label>Desktop Image (1920×1080px)</Label>
              <div className="mt-2 flex items-start gap-4">
                {data.desktopImageUrl ? (
                  <div className="relative w-40 h-24 rounded-lg overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.desktopImageUrl} alt="Desktop" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        updateField('desktopImageId', null);
                        updateField('desktopImageUrl', null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => openMediaLibrary('desktopImage')}
                    className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                  </button>
                )}
                <Button variant="outline" onClick={() => openMediaLibrary('desktopImage')}>
                  Select from Library
                </Button>
              </div>
            </div>
            <div>
              <Label>Mobile Image (1000×1145px)</Label>
              <div className="mt-2 flex items-start gap-4">
                {data.mobileImageUrl ? (
                  <div className="relative w-32 h-36 rounded-lg overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.mobileImageUrl} alt="Mobile" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        updateField('mobileImageId', null);
                        updateField('mobileImageUrl', null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => openMediaLibrary('mobileImage')}
                    className="w-32 h-36 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                  </button>
                )}
                <Button variant="outline" onClick={() => openMediaLibrary('mobileImage')}>
                  Select from Library
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Video Background */}
      {data.backgroundType === 'video' && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">🎥 Video Background</h3>
          <div className="space-y-4">
            <div>
              <Label>Video Type</Label>
              <select
                value={data.videoType}
                onChange={(e) => updateField('videoType', e.target.value as 'youtube' | 'vimeo' | 'upload')}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
              </select>
            </div>
            <div>
              <Label>Video URL</Label>
              <Input
                value={data.videoUrl}
                onChange={(e) => updateField('videoUrl', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.videoAutoplay}
                  onChange={(e) => updateField('videoAutoplay', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Autoplay</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.videoMuted}
                  onChange={(e) => updateField('videoMuted', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Muted</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.videoLoop}
                  onChange={(e) => updateField('videoLoop', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Loop</span>
              </label>
            </div>
          </div>
        </Card>
      )}

      {/* Slider Background - Continued in next file part */}
      {data.backgroundType === 'slider' && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">🎞️ Image Slider</h3>
          <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Speed (ms)</Label>
                <Input
                  type="number"
                  value={data.sliderSpeed}
                  onChange={(e) => updateField('sliderSpeed', parseInt(e.target.value))}
                  min="1000"
                  step="500"
                />
              </div>
              <div>
                <Label>Transition</Label>
                <select
                  value={data.sliderTransition}
                  onChange={(e) => updateField('sliderTransition', e.target.value as 'fade' | 'slide')}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.sliderAutoplay}
                  onChange={(e) => updateField('sliderAutoplay', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Autoplay</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.sliderShowDots}
                  onChange={(e) => updateField('sliderShowDots', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Dots</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.sliderShowArrows}
                  onChange={(e) => updateField('sliderShowArrows', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Arrows</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            {data.slides.map((slide, index) => (
              <Card key={slide.id} className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Slide {index + 1}</h4>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => moveSlide(index, 'up')} disabled={index === 0}>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => moveSlide(index, 'down')} disabled={index === data.slides.length - 1}>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => removeSlide(index)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Desktop</Label>
                    <div className="mt-2">
                      {slide.desktopImageUrl ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.desktopImageUrl} alt="Desktop" className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const newSlides = [...data.slides];
                              newSlides[index].desktopImageId = null;
                              newSlides[index].desktopImageUrl = null;
                              updateField('slides', newSlides);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => openMediaLibrary('desktopImage', index)}
                          className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                        >
                          <Upload className="w-5 h-5 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Mobile</Label>
                    <div className="mt-2">
                      {slide.mobileImageUrl ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.mobileImageUrl} alt="Mobile" className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const newSlides = [...data.slides];
                              newSlides[index].mobileImageId = null;
                              newSlides[index].mobileImageUrl = null;
                              updateField('slides', newSlides);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => openMediaLibrary('mobileImage', index)}
                          className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500"
                        >
                          <Upload className="w-5 h-5 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button onClick={addSlide} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Slide
            </Button>
          </div>
        </Card>
      )}

      {/* Layout & Styling */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">📐 Layout & Styling</h3>
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Height</Label>
              <select value={data.height} onChange={(e) => updateField('height', e.target.value as 'medium' | 'large' | 'full')} className="w-full px-3 py-2 border rounded-md">
                <option value="medium">Medium (60vh)</option>
                <option value="large">Large (80vh)</option>
                <option value="full">Full (100vh)</option>
              </select>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm mb-3">🖥️ Desktop Image Settings</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Image Fit</Label>
                  <select value={data.desktopImageFit} onChange={(e) => updateField('desktopImageFit', e.target.value as 'contain' | 'cover')} className="w-full px-2 py-1.5 border rounded text-sm">
                    <option value="cover">Fill & Crop</option>
                    <option value="contain">Show Full</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Position</Label>
                  <select value={data.desktopImagePosition} onChange={(e) => updateField('desktopImagePosition', e.target.value as 'center' | 'top' | 'bottom' | 'left' | 'right')} className="w-full px-2 py-1.5 border rounded text-sm">
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-sm mb-3">📱 Mobile Image Settings</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Image Fit</Label>
                  <select value={data.mobileImageFit} onChange={(e) => updateField('mobileImageFit', e.target.value as 'contain' | 'cover')} className="w-full px-2 py-1.5 border rounded text-sm">
                    <option value="contain">Show Full (Recommended)</option>
                    <option value="cover">Fill & Crop</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Position</Label>
                  <select value={data.mobileImagePosition} onChange={(e) => updateField('mobileImagePosition', e.target.value as 'center' | 'top' | 'bottom' | 'left' | 'right')} className="w-full px-2 py-1.5 border rounded text-sm">
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>H-Align</Label>
              <select value={data.contentAlignment} onChange={(e) => updateField('contentAlignment', e.target.value as 'left' | 'center' | 'right')} className="w-full px-3 py-2 border rounded-md">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <Label>V-Align</Label>
              <select value={data.verticalAlignment} onChange={(e) => updateField('verticalAlignment', e.target.value as 'top' | 'center' | 'bottom')} className="w-full px-3 py-2 border rounded-md">
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            <div>
              <Label>Title Size</Label>
              <select value={data.titleSize} onChange={(e) => updateField('titleSize', e.target.value as 'medium' | 'large' | 'xlarge')} className="w-full px-3 py-2 border rounded-md">
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">XL</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="overlay" checked={data.overlay} onChange={(e) => updateField('overlay', e.target.checked)} className="w-4 h-4" />
            <Label htmlFor="overlay">Enable Overlay</Label>
          </div>
          {data.overlay && (
            <div className="grid grid-cols-3 gap-4 pl-6">
              <div>
                <Label>Color</Label>
                <Input type="color" value={data.overlayColor} onChange={(e) => updateField('overlayColor', e.target.value)} />
              </div>
              <div>
                <Label>Opacity</Label>
                <Input type="number" min="0" max="1" step="0.1" value={data.overlayOpacity} onChange={(e) => updateField('overlayOpacity', parseFloat(e.target.value))} />
              </div>
            </div>
          )}
          <div>
            <Label>Text Color</Label>
            <Input type="color" value={data.textColor} onChange={(e) => updateField('textColor', e.target.value)} />
          </div>
        </div>
      </Card>

      {/* Button Styling */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">🔘 Button</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Style</Label>
            <select value={data.buttonStyle} onChange={(e) => updateField('buttonStyle', e.target.value as 'solid' | 'outline' | 'ghost' | 'both')} className="w-full px-3 py-2 border rounded-md">
              <option value="solid">Solid (BG only)</option>
              <option value="outline">Outline (Border only)</option>
              <option value="both">Both (BG + Border)</option>
              <option value="ghost">Ghost (No BG/Border)</option>
            </select>
          </div>
          <div>
            <Label>Size</Label>
            <select value={data.buttonSize} onChange={(e) => updateField('buttonSize', e.target.value as 'medium' | 'large')} className="w-full px-3 py-2 border rounded-md">
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <Label>BG Color</Label>
            <Input type="color" value={data.buttonColor} onChange={(e) => updateField('buttonColor', e.target.value)} />
          </div>
          <div>
            <Label>Text Color</Label>
            <Input type="color" value={data.buttonTextColor} onChange={(e) => updateField('buttonTextColor', e.target.value)} />
          </div>
          <div>
            <Label>BG Opacity</Label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={(data.buttonBackgroundOpacity ?? 1) * 100}
                onChange={(e) => updateField('buttonBackgroundOpacity', parseInt(e.target.value) / 100)}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">{Math.round((data.buttonBackgroundOpacity ?? 1) * 100)}%</span>
            </div>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.buttonTextBold ?? false}
                onChange={(e) => updateField('buttonTextBold', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Bold Text</span>
            </label>
          </div>
          <div>
            <Label>Border Width</Label>
            <select value={data.buttonBorderWidth ?? 2} onChange={(e) => updateField('buttonBorderWidth', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-md">
              <option value="1">1px (Thin)</option>
              <option value="2">2px (Normal)</option>
              <option value="3">3px (Medium)</option>
              <option value="4">4px (Thick)</option>
              <option value="5">5px (Extra Thick)</option>
            </select>
          </div>
          <div>
            <Label>Border Radius</Label>
            <select value={data.buttonBorderRadius ?? 'md'} onChange={(e) => updateField('buttonBorderRadius', e.target.value as 'none' | 'sm' | 'md' | 'lg' | 'full')} className="w-full px-3 py-2 border rounded-md">
              <option value="none">None (Square)</option>
              <option value="sm">Small (4px)</option>
              <option value="md">Medium (8px)</option>
              <option value="lg">Large (12px)</option>
              <option value="full">Full (Pill)</option>
            </select>
          </div>
          <div>
            <Label>Shadow</Label>
            <select value={data.buttonShadow ?? 'lg'} onChange={(e) => updateField('buttonShadow', e.target.value as 'none' | 'sm' | 'md' | 'lg' | 'xl')} className="w-full px-3 py-2 border rounded-md">
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
