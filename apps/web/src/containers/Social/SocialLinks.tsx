import { SocialIcon } from "@/components";
import { socialSection } from "@/lib/content/social";

const SocialLinks = ({ className = "" }: { className?: string }) => {
  const { socialLinks } = socialSection;
  return (
    <ul className={className}>
      {socialLinks.map(({ icon, url }) => (
        <SocialIcon key={`${url}-${icon}`} icon={icon} url={url} />
      ))}
    </ul>
  );
};

export default SocialLinks;
