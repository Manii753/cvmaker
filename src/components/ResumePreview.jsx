import React, { useRef } from 'react';
import { getTemplate } from '@/components/Templates';
import useResumeStore from '@/lib/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Download, 
  Printer, 
  Eye, 
  Palette,
  FileText
} from 'lucide-react';

export default function ResumePreview({ className = '' }) {
  const { resumeData, updateMeta, availableTemplates } = useResumeStore();
  const previewRef = useRef(null);

  // Get the current template component
  const TemplateComponent = getTemplate(resumeData.meta?.templateId || 'modern');

  const handleTemplateChange = (templateId) => {
    updateMeta({ templateId });
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printContent = previewRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Refresh to restore React functionality
    }
  };

  const handleDownloadPDF = () => {
    // This will be implemented with @react-pdf/renderer or Puppeteer
    console.log('PDF download functionality to be implemented');
    // For now, trigger print which allows "Save as PDF"
    handlePrint();
  };

  const hasContent = () => {
    const { personal, summary, experience, education, skills } = resumeData;
    return (
      (personal?.firstName && personal?.lastName) ||
      summary ||
      (experience && experience.length > 0) ||
      (education && education.length > 0) ||
      (skills && skills.length > 0)
    );
  };

  const previewScale = 0.75; // Scale down for preview

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Preview Controls */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="w-5 h-5" />
            Resume Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {/* Template Selector */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <Select 
                value={resumeData.meta?.templateId || 'modern'} 
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                disabled={!hasContent()}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={!hasContent()}
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        {hasContent() ? (
          <div 
            className="mx-auto bg-white shadow-lg"
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top center',
              width: `${100 / previewScale}%`,
              minHeight: '842px', // A4 height
            }}
            ref={previewRef}
          >
            <TemplateComponent data={resumeData} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Card className="p-8 text-center max-w-md">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Content Yet</h3>
              <p className="text-muted-foreground text-sm">
                Start filling out your information in the form to see your resume preview here.
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Preview is scaled to {Math.round(previewScale * 100)}% • 
          Template: {resumeData.meta?.templateId?.charAt(0).toUpperCase() + resumeData.meta?.templateId?.slice(1) || 'Modern'}
        </p>
      </div>
    </div>
  );
}