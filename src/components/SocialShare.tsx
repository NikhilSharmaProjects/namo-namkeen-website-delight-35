
import { Share2, Facebook, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialShare = () => {
  const shareUrl = "https://www.namoindianamkeen.com/";
  const shareText = "Just discovered Namo Namkeen - authentic Indore snacks delivered fresh! 🌶️ #NamoNamkeen #IndoreSnacks";

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Namo Namkeen - Authentic Indori Snacks',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-saffron/10 to-turmeric/10 py-8 my-12 rounded-2xl border-2 border-saffron/20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-chili fill-current" />
          <h3 className="text-2xl font-bold font-poppins text-warmBrown">
            Share the Crunch — Spread the Love!
          </h3>
          <Heart className="w-6 h-6 text-chili fill-current" />
        </div>
        
        <p className="text-warmBrown/80 font-merriweather mb-6 max-w-md mx-auto">
          Love our authentic Indore flavors? Share the joy with your friends and family!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={shareOnFacebook}
            className="bg-blue-600 hover:bg-blue-700 text-white font-poppins font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Share on Facebook
          </Button>
          
          <Button
            onClick={shareOnTwitter}
            className="bg-sky-500 hover:bg-sky-600 text-white font-poppins font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Tweet About Us
          </Button>
          
          {navigator.share && (
            <Button
              onClick={shareNative}
              className="bg-saffron hover:bg-saffron/90 text-white font-poppins font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
