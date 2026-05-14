'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Step1LearningGoal from '@/components/onboarding/step-1-learning-goal';
import Step2TargetDate from '@/components/onboarding/step-2-target-date';
import Step3UploadMaterial from '@/components/onboarding/step-3-upload-material';

type OnboardingData = {
  learningGoal: string;
  targetDate: Date | null;
  uploadedContent: string;
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    learningGoal: '',
    targetDate: null,
    uploadedContent: '',
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...stepData }));
    
    if (currentStep < 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    console.log('[v0] Onboarding completed with data:', data);
    // In production, send this data to your backend
    // Then redirect to dashboard or main app
    window.location.href = '/';
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          {/* Step Indicator */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Step {currentStep} of 3
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step === currentStep
                      ? 'w-8 bg-primary'
                      : step < currentStep
                      ? 'w-2 bg-primary/50'
                      : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Content with Slide Animation */}
          <div className="relative min-h-[400px] sm:min-h-[500px]">
            {!isTransitioning && (
              <div className="animate-fade-in-up">
                {currentStep === 1 && (
                  <Step1LearningGoal
                    value={data.learningGoal}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 2 && (
                  <Step2TargetDate
                    value={data.targetDate}
                    onNext={handleNext}
                    onSkip={handleSkip}
                  />
                )}
                {currentStep === 3 && (
                  <Step3UploadMaterial
                    value={data.uploadedContent}
                    onNext={handleNext}
                    onSkip={handleSkip}
                  />
                )}
              </div>
            )}
          </div>

          {/* Step Counter and Navigation */}
          <div className="mt-12 sm:mt-16 flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
            <div>Step {currentStep} of 3</div>
            <div className="flex items-center gap-1">
              {currentStep < 3 && <span>Next</span>}
              {currentStep === 3 && <span>Complete</span>}
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
