import requests
import sys
from datetime import datetime

class GlobalAgriAPITester:
    def __init__(self, base_url="https://globalagri-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    print(f"   Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_insights_list(self):
        """Test insights list endpoint"""
        success, response = self.run_test("Get Insights List", "GET", "api/insights", 200)
        if success:
            insights = response
            print(f"   Found {len(insights)} insights")
            if len(insights) >= 6:
                print("   ✅ Expected 6+ insights found")
            else:
                print(f"   ⚠️  Expected 6+ insights, found {len(insights)}")
        return success

    def test_insights_filtering(self):
        """Test insights filtering by category"""
        success, response = self.run_test("Filter Insights by Grains", "GET", "api/insights", 200, params={"category": "Grains"})
        if success:
            insights = response
            print(f"   Found {len(insights)} grains insights")
            if len(insights) > 0:
                print("   ✅ Grains filtering working")
            else:
                print("   ⚠️  No grains insights found")
        return success

    def test_insight_detail(self):
        """Test insight detail endpoint"""
        # First get insights list to get a valid ID
        success, response = self.run_test("Get Insights for Detail Test", "GET", "api/insights", 200)
        if success and len(response) > 0:
            insight_id = response[0].get('slug') or response[0].get('id')
            return self.run_test("Get Insight Detail", "GET", f"api/insights/{insight_id}", 200)
        return False

    def test_jobs_list(self):
        """Test jobs list endpoint"""
        success, response = self.run_test("Get Jobs List", "GET", "api/jobs", 200)
        if success:
            jobs = response
            print(f"   Found {len(jobs)} jobs")
            if len(jobs) >= 4:
                print("   ✅ Expected 4+ jobs found")
            else:
                print(f"   ⚠️  Expected 4+ jobs, found {len(jobs)}")
        return success

    def test_job_detail(self):
        """Test job detail endpoint"""
        # First get jobs list to get a valid ID
        success, response = self.run_test("Get Jobs for Detail Test", "GET", "api/jobs", 200)
        if success and len(response) > 0:
            job_id = response[0].get('slug') or response[0].get('id')
            return self.run_test("Get Job Detail", "GET", f"api/jobs/{job_id}", 200)
        return False

    def test_job_application(self):
        """Test job application submission"""
        # First get a job ID
        success, response = self.run_test("Get Jobs for Application Test", "GET", "api/jobs", 200)
        if success and len(response) > 0:
            job_id = response[0].get('id')
            application_data = {
                "job_id": job_id,
                "name": f"Test Applicant {datetime.now().strftime('%H%M%S')}",
                "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
                "phone": "+1234567890",
                "linkedin": "https://linkedin.com/in/test",
                "cover_letter": "This is a test application."
            }
            return self.run_test("Submit Job Application", "POST", "api/jobs/apply", 200, data=application_data)
        return False

    def test_career_inquiry(self):
        """Test career inquiry submission"""
        inquiry_data = {
            "name": f"Test Inquirer {datetime.now().strftime('%H%M%S')}",
            "email": f"inquiry{datetime.now().strftime('%H%M%S')}@example.com",
            "message": "This is a test career inquiry."
        }
        return self.run_test("Submit Career Inquiry", "POST", "api/careers/inquiry", 200, data=inquiry_data)

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": f"Test Contact {datetime.now().strftime('%H%M%S')}",
            "company": "Test Company",
            "email": f"contact{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1234567890",
            "country": "USA",
            "product_interest": "Grains",
            "message": "This is a test contact message."
        }
        return self.run_test("Submit Contact Form", "POST", "api/contact", 200, data=contact_data)

    def test_contact_form_validation(self):
        """Test contact form validation with missing required fields"""
        contact_data = {
            "company": "Test Company",
            "phone": "+1234567890"
            # Missing required fields: name, email, message
        }
        success, response = self.run_test("Contact Form Validation", "POST", "api/contact", 422, data=contact_data)
        if success:
            print("   ✅ Validation working correctly")
        return success

    def test_partners(self):
        """Test partners endpoint"""
        success, response = self.run_test("Get Partners", "GET", "api/partners", 200)
        if success:
            partners = response
            print(f"   Found {len(partners)} partners")
            if len(partners) > 0:
                print("   ✅ Partners data available")
            else:
                print("   ⚠️  No partners found")
        return success

    def test_memberships(self):
        """Test memberships endpoint"""
        success, response = self.run_test("Get Memberships", "GET", "api/memberships", 200)
        if success:
            memberships = response
            print(f"   Found {len(memberships)} memberships")
            if len(memberships) > 0:
                print("   ✅ Memberships data available")
            else:
                print("   ⚠️  No memberships found")
        return success

    def test_pdf_download(self):
        """Test PDF download endpoint"""
        url = f"{self.base_url}/api/download/profile"
        print(f"\n🔍 Testing PDF Download...")
        self.tests_run += 1
        
        try:
            response = requests.get(url)
            if response.status_code == 200 and response.headers.get('content-type') == 'application/pdf':
                self.tests_passed += 1
                print(f"✅ Passed - PDF download working, size: {len(response.content)} bytes")
                return True
            else:
                print(f"❌ Failed - Status: {response.status_code}, Content-Type: {response.headers.get('content-type')}")
                return False
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

def main():
    # Setup
    tester = GlobalAgriAPITester()
    
    print("🚀 Starting GlobalAgri Commodities API Tests")
    print(f"Testing against: {tester.base_url}")
    
    # Run all tests
    tests = [
        tester.test_health,
        tester.test_partners,
        tester.test_memberships,
        tester.test_insights_list,
        tester.test_insights_filtering,
        tester.test_insight_detail,
        tester.test_jobs_list,
        tester.test_job_detail,
        tester.test_job_application,
        tester.test_career_inquiry,
        tester.test_contact_form,
        tester.test_contact_form_validation,
        tester.test_pdf_download
    ]
    
    for test in tests:
        test()
    
    # Print results
    print(f"\n📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())