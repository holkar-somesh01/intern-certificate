import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toaster';
import { Award, Download, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const Certificate = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });

  if (!user) return null;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Update user profile with payment status
      updateUserProfile({ paymentCompleted: true });

      setTimeout(() => {
        setIsModalOpen(false);
        showToast('Certificate purchase successful!', 'success');
      }, 2000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const canGetCertificate = () => {
    const allStepsApproved =
      user.projectProgress.step1 === 'approved' &&
      user.projectProgress.step2 === 'approved' &&
      user.projectProgress.step3 === 'approved';

    return allStepsApproved && user.daysActive >= 30;
  };

  const getRequirementsMessage = () => {
    const messages = [];

    if (user.projectProgress.step1 !== 'approved' ||
      user.projectProgress.step2 !== 'approved' ||
      user.projectProgress.step3 !== 'approved') {
      messages.push('Complete all project steps');
    }

    if (user.daysActive < 30) {
      messages.push(`Be active for ${30 - user.daysActive} more days`);
    }

    return messages;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Certificate Status</CardTitle>
        </CardHeader>
        <CardContent>
          {canGetCertificate() ? (
            <div className="text-center">
              <div className="mb-6">
                <Award size={80} className="mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold mt-4 mb-2">
                  {user.paymentCompleted
                    ? 'Your Certificate is Ready!'
                    : 'You\'re Eligible for Certification!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {user.paymentCompleted
                    ? 'Congratulations on completing the internship! Your certificate is now available for download.'
                    : 'Congratulations! You\'ve completed all the requirements for the internship. Purchase your certificate now!'}
                </p>

                {user.paymentCompleted ? (
                  <Button
                    size="lg"
                    className="flex items-center mx-auto"
                  >
                    <Download size={20} className="mr-2" />
                    Download Certificate
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="flex items-center mx-auto"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <CreditCard size={20} className="mr-2" />
                    Purchase Certificate ($49)
                  </Button>
                )}
              </div>

              {user.paymentCompleted && (
                <div className="mt-8 border rounded-lg p-6 bg-gray-50 text-center">
                  <img
                    src="https://images.pexels.com/photos/6009034/pexels-photo-6009034.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Certificate Preview"
                    className="mb-4 rounded-md border shadow-sm max-w-md mx-auto"
                  />
                  <p className="text-gray-600 mb-4">Preview of your internship certificate</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">
                      <Download size={16} className="mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      Share Certificate
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <Award size={80} className="mx-auto text-gray-300" />
                <h2 className="text-2xl font-bold mt-4 mb-2">Certificate Not Available Yet</h2>
                <p className="text-gray-600 mb-6">
                  You need to complete all requirements to earn your certificate.
                </p>

                <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-md p-4 text-left">
                  <h3 className="text-sm font-medium text-yellow-800 mb-2">Outstanding Requirements:</h3>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    {getRequirementsMessage().map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle size={20} className="text-green-500 mr-2" />
                    <h3 className="font-medium">Project Steps</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete all three project steps to qualify.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Step 1:</span>
                      <span className={`font-medium ${user.projectProgress.step1 === 'approved' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {user.projectProgress.step1 === 'approved' ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Step 2:</span>
                      <span className={`font-medium ${user.projectProgress.step2 === 'approved' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {user.projectProgress.step2 === 'approved' ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Step 3:</span>
                      <span className={`font-medium ${user.projectProgress.step3 === 'approved' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {user.projectProgress.step3 === 'approved' ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle size={20} className={`${user.daysActive >= 30 ? 'text-green-500' : 'text-gray-400'} mr-2`} />
                    <h3 className="font-medium">Activity Requirement</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Be active for at least 30 days during the internship.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Days Active:</span>
                      <span className="font-medium">{user.daysActive} / 30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (user.daysActive / 30) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
              </div>
              <h3 className="font-medium mb-2">Professional Credibility</h3>
              <p className="text-sm text-gray-600">
                Enhance your resume and prove your skills with a verified certificate.
              </p>
            </div>

            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </div>
              <h3 className="font-medium mb-2">LinkedIn Integration</h3>
              <p className="text-sm text-gray-600">
                Add your certificate directly to your LinkedIn profile to showcase your achievement.
              </p>
            </div>

            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><circle cx="12" cy="12" r="10" /><path d="m16 10-4.5 4.5L9 12" /></svg>
              </div>
              <h3 className="font-medium mb-2">Verification System</h3>
              <p className="text-sm text-gray-600">
                Each certificate has a unique verification code that employers can use to verify authenticity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Purchase Certificate</h2>
                <button
                  onClick={() => !isProcessing && setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isProcessing}
                >
                  ×
                </button>
              </div>

              {paymentSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-green-800 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6">
                    Your certificate is now available for download.
                  </p>
                  <Button onClick={() => setIsModalOpen(false)}>
                    View Certificate
                  </Button>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex justify-between mb-4">
                      <span>Certificate Fee</span>
                      <span className="font-medium">$49.00</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Your certificate will be available immediately after payment.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      id="name"
                      name="name"
                      value={paymentForm.name}
                      onChange={handleInputChange}
                      placeholder="As it appears on card"
                      required
                      disabled={isProcessing}
                    />

                    <Input
                      label="Card Number"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      disabled={isProcessing}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentForm.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        disabled={isProcessing}
                      />

                      <Input
                        label="CVV"
                        id="cvv"
                        name="cvv"
                        value={paymentForm.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        disabled={isProcessing}
                      />
                    </div>

                    <Input
                      label="Email (for receipt)"
                      id="email"
                      name="email"
                      type="email"
                      value={paymentForm.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      fullWidth
                      isLoading={isProcessing}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Pay $49.00'}
                    </Button>

                    <p className="text-xs text-center mt-4 text-gray-500">
                      By proceeding, you agree to our terms and conditions.
                      All payments are secure and encrypted.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;