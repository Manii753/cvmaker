import { useEffect , useState } from 'react';
import useResumeStore from '@/lib/store/resumeStore';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderOpen,
  Award,
  Languages,
  Link,
  Plus
} from 'lucide-react';

// Import form steps
import PersonalInfoStep from './FormSteps/PersonalInfoStep';
import SummaryStep from './FormSteps/SummaryStep';
import ExperienceStep from './FormSteps/ExperienceStep';
import EducationStep from './FormSteps/EducationStep';
import SkillsStep from './FormSteps/SkillsStep';
import ResumePreview from './ResumePreview';

const steps = [
  {
    id: 0,
    title: 'Personal Info',
    description: 'Basic information',
    icon: User,
    component: PersonalInfoStep,
  },
  {
    id: 1,
    title: 'Summary',
    description: 'Professional summary',
    icon: FileText,
    component: SummaryStep,
  },
  {
    id: 2,
    title: 'Experience',
    description: 'Work history',
    icon: Briefcase,
    component: ExperienceStep,
  },
  {
    id: 3,
    title: 'Education',
    description: 'Educational background',
    icon: GraduationCap,
    component: EducationStep,
  },
  {
    id: 4,
    title: 'Skills',
    description: 'Technical & soft skills',
    icon: Zap,
    component: SkillsStep,
  },
  // Additional steps can be added here
];

export default function ResumeBuilder() {
  const { 
    currentStep, 
    setCurrentStep, 
    isDirty, 
    isSaving,
    saveResume,
    resumeData 
  } = useResumeStore();

  const [showPreview, setShowPreview] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (isDirty) {
      saveResume();
    }
  }, [isDirty, saveResume]);

  const getCurrentStepComponent = () => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return null;
    const Component = step.component;
    return <Component />;
  };

  const getStepStatus = (stepId) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return 'incomplete';
    
    // Check if step has required content
    switch (stepId) {
      case 0: // Personal Info
        return (resumeData.personal?.firstName && resumeData.personal?.lastName && resumeData.personal?.email) 
          ? 'complete' : 'incomplete';
      case 1: // Summary
        return resumeData.summary ? 'complete' : 'incomplete';
      case 2: // Experience
        return (resumeData.experience && resumeData.experience.length > 0) ? 'complete' : 'incomplete';
      case 3: // Education
        return (resumeData.education && resumeData.education.length > 0) ? 'complete' : 'incomplete';
      case 4: // Skills
        return (resumeData.skills && resumeData.skills.length > 0) ? 'complete' : 'incomplete';
      default:
        return 'incomplete';
    }
  };

  const getCompletionPercentage = () => {
    const completedSteps = steps.filter(step => getStepStatus(step.id) === 'complete').length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Resume Builder</h1>
              <Badge variant="outline" className="flex items-center gap-1">
                <Save className="w-3 h-3" />
                {isSaving ? 'Saving...' : 'Saved'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Progress */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {getCompletionPercentage()}% Complete
                </span>
                <Progress value={getCompletionPercentage()} className="w-24" />
              </div>

              {/* Preview Toggle (Mobile) */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide' : 'Preview'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Form Section */}
          <div className={`lg:col-span-7 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <div className="space-y-6 h-full">
              {/* Step Navigation */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Build Your Resume</h2>
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  
                  {/* Step Tabs */}
                  <Tabs value={currentStep.toString()} className="w-full">
                    <TabsList className="grid grid-cols-5 w-full h-auto p-1">
                      {steps.map((step) => {
                        const IconComponent = step.icon;
                        const status = getStepStatus(step.id);
                        const isActive = currentStep === step.id;
                        
                        return (
                          <TabsTrigger
                            key={step.id}
                            value={step.id.toString()}
                            onClick={() => handleStepClick(step.id)}
                            className="flex flex-col gap-1 py-3 px-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            <div className="flex items-center gap-1">
                              <IconComponent className="w-3 h-3" />
                              {status === 'complete' && (
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                              )}
                            </div>
                            <span className="font-medium">{step.title}</span>
                            <span className="text-xs opacity-70 hidden sm:block">
                              {step.description}
                            </span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Current Step Content */}
              <div className="flex-1 overflow-auto">
                {getCurrentStepComponent()}
              </div>

            </div>
          </div>

          {/* Preview Section */}
          <div className={`lg:col-span-5 ${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-6">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}