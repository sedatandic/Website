#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class GlobalAgriAPITester:
    def __init__(self, base_url="https://qatar-commodities.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: Non-JSON content")
            else:
                self.failed_tests.append({
                    'test': name,
                    'endpoint': endpoint,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200] if response.text else 'No response'
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if success and response.content else {}

        except requests.exceptions.Timeout:
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': 'Request timeout (10s)'
            })
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_insights(self):
        """Test insights endpoints"""
        # Get all insights
        success, insights = self.run_test("Get All Insights", "GET", "api/insights", 200)
        if not success:
            return False
            
        # Test with category filter
        self.run_test("Get Insights by Category", "GET", "api/insights?category=Market Analysis", 200)
        
        # Test with search filter
        self.run_test("Search Insights", "GET", "api/insights?search=grain", 200)
        
        # Test specific insight if any exist
        if insights and len(insights) > 0:
            first_insight = insights[0]
            if 'id' in first_insight:
                self.run_test("Get Specific Insight", "GET", f"api/insights/{first_insight['id']}", 200)
            elif 'slug' in first_insight:
                self.run_test("Get Specific Insight by Slug", "GET", f"api/insights/{first_insight['slug']}", 200)
        
        return True

    def test_jobs(self):
        """Test jobs endpoints"""
        # Get all jobs
        success, jobs = self.run_test("Get All Jobs", "GET", "api/jobs", 200)
        if not success:
            return False
            
        # Test with location filter
        self.run_test("Get Jobs by Location", "GET", "api/jobs?location=Singapore", 200)
        
        # Test with department filter
        self.run_test("Get Jobs by Department", "GET", "api/jobs?department=Trading", 200)
        
        # Test specific job if any exist
        if jobs and len(jobs) > 0:
            first_job = jobs[0]
            if 'id' in first_job:
                self.run_test("Get Specific Job", "GET", f"api/jobs/{first_job['id']}", 200)
            elif 'slug' in first_job:
                self.run_test("Get Specific Job by Slug", "GET", f"api/jobs/{first_job['slug']}", 200)
        
        # Test specific job slugs mentioned in requirements
        self.run_test("Get Risk Analyst Job", "GET", "api/jobs/risk-analyst-singapore", 200)
        self.run_test("Get Senior Grains Trader Job", "GET", "api/jobs/senior-grains-trader", 200)
        
        return True

    def test_partners(self):
        """Test partners endpoint"""
        return self.run_test("Get Partners", "GET", "api/partners", 200)

    def test_memberships(self):
        """Test memberships endpoint"""
        return self.run_test("Get Memberships", "GET", "api/memberships", 200)

    def test_download_profile(self):
        """Test PDF download endpoint"""
        success, _ = self.run_test("Download Company Profile", "GET", "api/download/profile", 200)
        return success

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "company": "Test Company",
            "email": "test@example.com",
            "phone": "+1234567890",
            "country": "Singapore",
            "product_interest": "Grains",
            "message": "This is a test message for API testing."
        }
        return self.run_test("Submit Contact Form", "POST", "api/contact", 200, data=test_data)

    def test_career_inquiry(self):
        """Test career inquiry submission"""
        test_data = {
            "name": "Test Candidate",
            "email": "candidate@example.com",
            "message": "This is a test career inquiry for API testing."
        }
        return self.run_test("Submit Career Inquiry", "POST", "api/careers/inquiry", 200, data=test_data)

    def test_job_application(self):
        """Test job application submission"""
        test_data = {
            "job_id": "test-job-id",
            "name": "Test Applicant",
            "email": "applicant@example.com",
            "phone": "+1234567890",
            "linkedin": "https://linkedin.com/in/testuser",
            "cover_letter": "This is a test cover letter for API testing."
        }
        return self.run_test("Submit Job Application", "POST", "api/jobs/apply", 200, data=test_data)

def main():
    print("🚀 Starting GlobalAgri Commodities API Testing...")
    print("=" * 60)
    
    tester = GlobalAgriAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Core endpoints
    tester.test_health()
    tester.test_insights()
    tester.test_jobs()
    tester.test_partners()
    tester.test_memberships()
    tester.test_download_profile()
    
    # Form submissions
    tester.test_contact_form()
    tester.test_career_inquiry()
    tester.test_job_application()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests ({len(tester.failed_tests)}):")
        for failure in tester.failed_tests:
            error_msg = failure.get('error', f"Expected {failure.get('expected')}, got {failure.get('actual')}")
            print(f"   • {failure['test']}: {error_msg}")
    else:
        print("\n✅ All tests passed!")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())