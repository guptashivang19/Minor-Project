import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MedicalDisclaimer from "@/components/medicalDisclaimer";
import { CheckCircle, Clock, Activity, ChevronRight, FileText, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <MedicalDisclaimer />

      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Your Personal Symptom Assistant
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Answer a few questions about your symptoms and get insights about potential health conditions in just 5 minutes.
        </p>
        <Link href="/interview/basic-info">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
            Start Symptom Check
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="text-center">
            <Clock className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Quick Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Complete a comprehensive symptom assessment in just 5 minutes.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="text-center">
            <Activity className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Intelligent Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Our algorithm analyzes your symptoms to identify potential health conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardHeader className="text-center">
            <Stethoscope className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Healthcare Guidance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Get recommendations on what steps to take next for your health concerns.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">1</span>
            </div>
            <h3 className="font-bold mb-2">Basic Information</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Provide your age, gender, and basic health information.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">2</span>
            </div>
            <h3 className="font-bold mb-2">Symptom Selection</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Tell us about the symptoms you're experiencing.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">3</span>
            </div>
            <h3 className="font-bold mb-2">Additional Details</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Answer specific questions about your symptoms and medical history.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-xl">4</span>
            </div>
            <h3 className="font-bold mb-2">Get Results</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Receive a list of potential conditions and recommended next steps.
            </p>
          </div>
        </div>
      </section>

      <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-md my-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Previous Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't completed any symptom assessments yet.
            </p>
            <Link href="/interview/basic-info">
              <Button className="bg-primary hover:bg-primary/90">
                Start Your First Assessment 
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
