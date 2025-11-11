export default function Footer() {
    return (
      <footer className="bg-black border-t border-primary/30 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-light">
            © {new Date().getFullYear()} HeyBuddy. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            For booking inquiries:{" "}
            <a
              href="mailto:management@heybuddyband.com"
              className="text-primary hover:text-primary-light"
            >
              management@heybuddyband.com
            </a>
          </p>
        </div>
      </footer>
    );
  }