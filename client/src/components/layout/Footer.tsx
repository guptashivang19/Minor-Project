import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Activity className="text-primary h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold text-primary">MediCheck</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              An intelligent symptom checker to help you understand your health concerns.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Health Library</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Medical Dictionary</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Medication Guide</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Find a Doctor</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">HIPAA Compliance</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MediCheck. All rights reserved. This application is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
