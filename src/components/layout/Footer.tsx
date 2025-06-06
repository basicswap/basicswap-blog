import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#fefffe] text-gray-800 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo and Navigation */}
        <div className="flex flex-wrap justify-between items-center border-b border-gray-300 pb-6 mb-6">
          {/* Logo */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Link className="block max-w-max" href="https://basicswapdex.com" passHref>
              <Image className="h-8" src="/images/basicswap-logo-dark.svg" alt="BasicSwap Logo" width={150} height={50} />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end">
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com" passHref>
                  Home
                </Link>
              </li>
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" target="_blank" href="https://docs.basicswapdex.com/docs/intro" passHref>
                  Docs
                </Link>
              </li>
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/faq" passHref>
                  FAQ
                </Link>
              </li>
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/about" passHref>
                  About
                </Link>
              </li>
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="/blog" passHref>
                  Blog
                </Link>
              </li>
              <li className="mr-12">
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/terms" passHref>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link className="inline-block text-lg md:text-xl text-coolGray-400 hover:text-coolGray-50 font-medium" href="https://basicswapdex.com/mediakit/mediakit-basicswap.zip" passHref>
                  Mediakit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and GitHub Icon */}
        <div className="flex flex-wrap justify-between items-center pt-6">
          {/* Copyright */}
          <div className="w-full md:w-auto mb-4 md:mb-0 flex items-center">
            <p className="mr-1 text-sm text-gray-900 font-medium">&copy; {new Date().getFullYear()}~ </p>
            <p className="text-sm text-coolGray-400 font-medium">BasicSwapDEX</p>
          </div>

          {/* GitHub Icon */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <a className="inline-block text-coolGray-300 hover:text-coolGray-400" href="https://github.com/basicswap/basicswap" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0C4.0275 0 0 4.13211 0 9.22838C0 13.3065 2.5785 16.7648 6.15375 17.9841C6.60375 18.0709 6.76875 17.7853 6.76875 17.5403C6.76875 17.3212 6.76125 16.7405 6.7575 15.9712C4.254 16.5277 3.726 14.7332 3.726 14.7332C3.3165 13.6681 2.72475 13.3832 2.72475 13.3832C1.9095 12.8111 2.78775 12.8229 2.78775 12.8229C3.6915 12.887 4.16625 13.7737 4.16625 13.7737C4.96875 15.1847 6.273 14.777 6.7875 14.5414C6.8685 13.9443 7.10025 13.5381 7.3575 13.3073C5.35875 13.0764 3.258 12.2829 3.258 8.74709C3.258 7.73988 3.60675 6.91659 4.18425 6.27095C4.083 6.03774 3.77925 5.0994 4.263 3.82846C4.263 3.82846 5.01675 3.58116 6.738 4.77462C7.458 4.56958 8.223 4.46785 8.988 4.46315C9.753 4.46785 10.518 4.56958 11.238 4.77462C12.948 3.58116 13.7017 3.82846 13.7017 3.82846C14.1855 5.0994 13.8818 6.03774 13.7917 6.27095C14.3655 6.91659 14.7142 7.73988 14.7142 8.74709C14.7142 12.2923 12.6105 13.0725 10.608 13.2995C10.923 13.5765 11.2155 14.1423 11.2155 15.0071C11.2155 16.242 11.2043 17.2344 11.2043 17.5341C11.2043 17.7759 11.3617 18.0647 11.823 17.9723C15.4237 16.7609 18 13.3002 18 9.22838C18 4.13211 13.9703 0 9 0Z" fill="currentColor"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
