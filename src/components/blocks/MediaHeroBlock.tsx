'use client';

import Link from 'next/link';

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
  buttonTextBold?: boolean;
  buttonBackgroundOpacity?: number;
  animateContent: boolean;
  animationDelay: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showButton?: boolean;
  contentMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  contentPaddingX?: 'none' | 'sm' | 'md' | 'lg';
  contentPaddingY?: 'none' | 'sm' | 'md' | 'lg';
  useCustomPosition?: boolean;
  customVerticalPosition?: number;
  customHorizontalPosition?: number;
  // Individual element positioning
  titleUseCustomPosition?: boolean;
  titleVerticalPosition?: number;
  titleHorizontalPosition?: number;
  subtitleUseCustomPosition?: boolean;
  subtitleVerticalPosition?: number;
  subtitleHorizontalPosition?: number;
  buttonUseCustomPosition?: boolean;
  buttonVerticalPosition?: number;
  buttonHorizontalPosition?: number;
  // Button styling
  buttonBorderWidth?: number;
  buttonBorderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

interface MediaHeroBlockProps {
  data: MediaHeroBlockData;
}

export default function MediaHeroBlock({ data }: MediaHeroBlockProps) {
  // Slider functionality removed - using direct image rendering instead
  // Uncomment below if slider support is needed in the future
  /*
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data.backgroundType === 'slider' && data.sliderAutoplay && data.slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.slides.length);
      }, data.sliderSpeed);
      return () => clearInterval(interval);
    }
  }, [data.backgroundType, data.sliderAutoplay, data.sliderSpeed, data.slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
  };
  */

  // Content alignment classes
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Vertical alignment classes
  const verticalAlignmentClasses = {
    top: 'justify-start pt-20',
    center: 'justify-center',
    bottom: 'justify-end pb-20',
  };

  // Title size classes
  const titleSizeClasses = {
    medium: 'text-4xl md:text-5xl',
    large: 'text-5xl md:text-6xl lg:text-7xl',
    xlarge: 'text-6xl md:text-7xl lg:text-8xl',
  };

  // Button size classes
  const buttonSizeClasses = {
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Button style classes
  const getButtonStyle = () => {
    const fontWeight = data.buttonTextBold ? 'font-bold' : 'font-semibold';
    const borderRadius = data.buttonBorderRadius === 'none' ? 'rounded-none' :
                        data.buttonBorderRadius === 'sm' ? 'rounded-sm' :
                        data.buttonBorderRadius === 'lg' ? 'rounded-lg' :
                        data.buttonBorderRadius === 'full' ? 'rounded-full' :
                        'rounded-md';
    const shadow = data.buttonShadow === 'none' ? '' :
                   data.buttonShadow === 'sm' ? 'shadow-sm hover:shadow-md' :
                   data.buttonShadow === 'md' ? 'shadow-md hover:shadow-lg' :
                   data.buttonShadow === 'xl' ? 'shadow-xl hover:shadow-2xl' :
                   'shadow-lg hover:shadow-xl';
    const borderWidth = data.buttonBorderWidth ? `border-${data.buttonBorderWidth}` : 'border-2';
    
    const baseClasses = `inline-block ${fontWeight} ${borderRadius} transition-all duration-300 transform hover:-translate-y-1`;
    
    if (data.buttonStyle === 'solid') {
      return `${baseClasses} ${shadow}`;
    } else if (data.buttonStyle === 'outline') {
      return `${baseClasses} ${borderWidth}`;
    } else if (data.buttonStyle === 'both') {
      return `${baseClasses} ${borderWidth} ${shadow}`;
    } else {
      return `${baseClasses}`;
    }
  };

  // Video embed functionality removed - currently using images only
  // Uncomment if video support is needed
  /*
  const getVideoEmbedUrl = () => {
    if (!data.videoUrl) return null;
    try {
      if (data.videoType === 'youtube') {
        const videoId = data.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
        if (videoId) {
          const params = new URLSearchParams({
            autoplay: data.videoAutoplay ? '1' : '0',
            mute: data.videoMuted ? '1' : '0',
            loop: data.videoLoop ? '1' : '0',
            controls: '0',
            playlist: videoId,
          });
          return `https://www.youtube.com/embed/${videoId}?${params}`;
        }
      } else if (data.videoType === 'vimeo') {
        const videoId = data.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
        if (videoId) {
          const params = new URLSearchParams({
            autoplay: data.videoAutoplay ? '1' : '0',
            muted: data.videoMuted ? '1' : '0',
            loop: data.videoLoop ? '1' : '0',
            background: '1',
          });
          return `https://player.vimeo.com/video/${videoId}?${params}`;
        }
      }
    } catch (error) {
      console.error('Error parsing video URL:', error);
    }
    return null;
  };
  */

  return (
    <section
      className="relative w-screen overflow-hidden"
      style={{
        backgroundColor: data.overlay ? data.overlayColor : 'transparent',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
      }}
    >
      {/* Actual images to set height based on aspect ratio */}
      {data.backgroundType === 'image' && (
        <>
          {/* Desktop Image - Only on desktop */}
          {data.desktopImageUrl && (
            <>
              <style dangerouslySetInnerHTML={{
                __html: `
                  @media (max-width: 767px) {
                    .hero-desktop-img-${data.desktopImageUrl.split('/').pop()?.split('.')[0]} {
                      display: none !important;
                    }
                  }
                `
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.desktopImageUrl}
                alt={data.title || 'Hero background'}
                className={`w-full h-auto hero-desktop-img-${data.desktopImageUrl.split('/').pop()?.split('.')[0]}`}
                style={{ 
                  maxWidth: '100%', 
                  display: 'block',
                }}
              />
            </>
          )}
          {/* Mobile Image - Only on mobile */}
          {data.mobileImageUrl ? (
            <>
              <style dangerouslySetInnerHTML={{
                __html: `
                  @media (min-width: 768px) {
                    .hero-mobile-img-${data.mobileImageUrl.split('/').pop()?.split('.')[0]} {
                      display: none !important;
                    }
                  }
                `
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.mobileImageUrl}
                alt={data.title || 'Hero background'}
                className={`w-full h-auto hero-mobile-img-${data.mobileImageUrl.split('/').pop()?.split('.')[0]}`}
                style={{ 
                  maxWidth: '100%', 
                  display: 'block',
                }}
              />
            </>
          ) : data.desktopImageUrl && (
            <>
              <style dangerouslySetInnerHTML={{
                __html: `
                  @media (min-width: 768px) {
                    .hero-mobile-fallback-img-${data.desktopImageUrl.split('/').pop()?.split('.')[0]} {
                      display: none !important;
                    }
                  }
                `
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.desktopImageUrl}
                alt={data.title || 'Hero background'}
                className={`w-full h-auto hero-mobile-fallback-img-${data.desktopImageUrl.split('/').pop()?.split('.')[0]}`}
                style={{ 
                  maxWidth: '100%', 
                  display: 'block',
                }}
              />
            </>
          )}
        </>
      )}

      {/* Overlay */}
      {data.overlay && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: data.overlayColor,
            opacity: data.overlayOpacity,
          }}
        />
      )}

      {/* Content - Absolutely positioned over image */}
      <div
        className={`absolute inset-0 z-20 ${data.useCustomPosition ? '' : `flex ${verticalAlignmentClasses[data.verticalAlignment]}`}`}
        style={{
          paddingLeft: data.contentPaddingX === 'none' ? '0' : data.contentPaddingX === 'sm' ? '1rem' : data.contentPaddingX === 'lg' ? '3rem' : '2rem',
          paddingRight: data.contentPaddingX === 'none' ? '0' : data.contentPaddingX === 'sm' ? '1rem' : data.contentPaddingX === 'lg' ? '3rem' : '2rem',
          paddingTop: data.contentPaddingY === 'none' ? '0' : data.contentPaddingY === 'sm' ? '1rem' : data.contentPaddingY === 'lg' ? '3rem' : '2rem',
          paddingBottom: data.contentPaddingY === 'none' ? '0' : data.contentPaddingY === 'sm' ? '1rem' : data.contentPaddingY === 'lg' ? '3rem' : '2rem',
        }}
      >
        {data.useCustomPosition ? (
          /* Custom Position Mode - Absolute positioning with sliders */
          <div
            className="absolute"
            style={{
              top: `${data.customVerticalPosition || 50}%`,
              left: `${data.customHorizontalPosition || 50}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`${
                data.contentMaxWidth === 'sm' ? 'max-w-sm' :
                data.contentMaxWidth === 'md' ? 'max-w-md' :
                data.contentMaxWidth === 'xl' ? 'max-w-xl' :
                data.contentMaxWidth === 'full' ? 'max-w-full' :
                'max-w-4xl'
              } ${data.animateContent ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${data.animationDelay}ms` }}
            >
              {/* Title */}
              {(data.showTitle !== false) && data.title && (
                <h1
                  className={`${titleSizeClasses[data.titleSize]} font-bold mb-6 text-center`}
                  style={{ color: data.textColor }}
                >
                  {data.title}
                </h1>
              )}

              {/* Subtitle */}
              {(data.showSubtitle !== false) && data.subtitle && (
                <p
                  className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 text-center"
                  style={{ color: data.textColor }}
                >
                  {data.subtitle}
                </p>
              )}

              {/* Button */}
              {(data.showButton !== false) && data.buttonText && data.buttonUrl && (
                <div className="flex justify-center">
                  <Link
                    href={data.buttonUrl}
                    className={`${getButtonStyle()} ${buttonSizeClasses[data.buttonSize]}`}
                    style={{
                      backgroundColor: (data.buttonStyle === 'solid' || data.buttonStyle === 'both')
                        ? `${data.buttonColor}${Math.round((data.buttonBackgroundOpacity ?? 1) * 255).toString(16).padStart(2, '0')}`
                        : 'transparent',
                      color: data.buttonTextColor,
                      borderColor: (data.buttonStyle === 'outline' || data.buttonStyle === 'both') ? data.buttonColor : 'transparent',
                    }}
                  >
                    {data.buttonText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Normal Mode - Alignment classes */
          <div className={`w-full flex flex-col ${alignmentClasses[data.contentAlignment]}`}>
            <div
              className={`${
                data.contentMaxWidth === 'sm' ? 'max-w-sm' :
                data.contentMaxWidth === 'md' ? 'max-w-md' :
                data.contentMaxWidth === 'xl' ? 'max-w-xl' :
                data.contentMaxWidth === 'full' ? 'max-w-full' :
                'max-w-4xl'
              } ${data.animateContent ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${data.animationDelay}ms` }}
            >
            {/* Title */}
            {(data.showTitle !== false) && data.title && (
              <h1
                className={`${titleSizeClasses[data.titleSize]} font-bold mb-6`}
                style={{ color: data.textColor }}
              >
                {data.title}
              </h1>
            )}

            {/* Subtitle */}
            {(data.showSubtitle !== false) && data.subtitle && (
              <p
                className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90"
                style={{ color: data.textColor }}
              >
                {data.subtitle}
              </p>
            )}

            {/* Button */}
            {(data.showButton !== false) && data.buttonText && data.buttonUrl && (
              <Link
                href={data.buttonUrl}
                className={`${getButtonStyle()} ${buttonSizeClasses[data.buttonSize]}`}
                style={{
                  backgroundColor: (data.buttonStyle === 'solid' || data.buttonStyle === 'both')
                    ? `${data.buttonColor}${Math.round((data.buttonBackgroundOpacity ?? 1) * 255).toString(16).padStart(2, '0')}`
                    : 'transparent',
                  color: data.buttonTextColor,
                  borderColor: (data.buttonStyle === 'outline' || data.buttonStyle === 'both') ? data.buttonColor : 'transparent',
                }}
              >
                {data.buttonText}
              </Link>
            )}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
