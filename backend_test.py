#!/usr/bin/env python3
"""
Backend API Testing Script for Mayank Arora Portfolio
Tests all backend endpoints according to test_result.md requirements
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://playboy-console.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test GET /api/ - Root endpoint"""
    print("\n=== Testing GET /api/ ===")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data:
                print("✅ Root endpoint working - returns message")
                return True
            else:
                print("❌ Root endpoint missing 'message' field")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Root endpoint error: {str(e)}")
        return False

def test_portfolio_endpoint():
    """Test GET /api/portfolio - Should return all portfolio sections"""
    print("\n=== Testing GET /api/portfolio ===")
    try:
        response = requests.get(f"{BASE_URL}/portfolio")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {list(data.keys())}")
            
            # Check for all required sections
            required_sections = [
                "personalInfo", "aboutContent", "skillsData", "projectsData", 
                "labsData", "freelanceData", "dsaData", "timelineData", 
                "hobbiesData", "contactData", "navLinks"
            ]
            
            missing_sections = []
            for section in required_sections:
                if section not in data:
                    missing_sections.append(section)
                else:
                    print(f"✅ {section}: Present")
            
            if missing_sections:
                print(f"❌ Missing sections: {missing_sections}")
                return False
            else:
                print("✅ All portfolio sections present and populated")
                return True
                
        else:
            print(f"❌ Portfolio endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Portfolio endpoint error: {str(e)}")
        return False

def test_contact_submission():
    """Test POST /api/contact - Should save contact form and return success"""
    print("\n=== Testing POST /api/contact ===")
    try:
        # Test data with realistic information
        test_contact = {
            "name": "Arjun Sharma",
            "email": "arjun.sharma@techcorp.com", 
            "message": "Hi Mayank, I came across your portfolio and I'm impressed with your cybersecurity projects, especially FraudHawk. We have an internship opportunity at our fintech startup that might be a great fit. Would love to discuss further!"
        }
        
        response = requests.post(
            f"{BASE_URL}/contact",
            json=test_contact,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") == True and "id" in data:
                print("✅ Contact submission successful - returns success and ID")
                return True, data.get("id")
            else:
                print("❌ Contact submission response missing success=True or id field")
                return False, None
        else:
            print(f"❌ Contact submission failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"❌ Contact submission error: {str(e)}")
        return False, None

def test_contact_validation():
    """Test POST /api/contact with invalid data - Should return validation error"""
    print("\n=== Testing POST /api/contact with invalid data ===")
    try:
        # Test with missing required fields
        invalid_contact = {
            "name": "Test User"
            # Missing email and message
        }
        
        response = requests.post(
            f"{BASE_URL}/contact",
            json=invalid_contact,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # FastAPI validation error
            print("✅ Contact validation working - returns 422 for missing fields")
            return True
        elif response.status_code == 400:  # Alternative validation error
            print("✅ Contact validation working - returns 400 for missing fields")
            return True
        else:
            print(f"❌ Contact validation not working - expected 422/400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Contact validation test error: {str(e)}")
        return False

def test_messages_endpoint():
    """Test GET /api/messages - Should return array of saved messages"""
    print("\n=== Testing GET /api/messages ===")
    try:
        response = requests.get(f"{BASE_URL}/messages")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of messages: {len(data)}")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check structure of first message
                    first_msg = data[0]
                    required_fields = ["id", "name", "email", "message", "created_at"]
                    missing_fields = []
                    
                    for field in required_fields:
                        if field not in first_msg:
                            missing_fields.append(field)
                    
                    if missing_fields:
                        print(f"❌ Message structure missing fields: {missing_fields}")
                        return False
                    else:
                        print("✅ Messages endpoint working - returns array with proper structure")
                        print(f"Sample message: {first_msg['name']} - {first_msg['email']}")
                        return True
                else:
                    print("✅ Messages endpoint working - returns empty array (no messages yet)")
                    return True
            else:
                print("❌ Messages endpoint should return array")
                return False
                
        else:
            print(f"❌ Messages endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Messages endpoint error: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for Mayank Arora Portfolio")
    print(f"Testing against: {BASE_URL}")
    print("=" * 60)
    
    results = {}
    
    # Test 1: Root endpoint
    results['root'] = test_root_endpoint()
    
    # Test 2: Portfolio endpoint
    results['portfolio'] = test_portfolio_endpoint()
    
    # Test 3: Contact submission
    contact_success, contact_id = test_contact_submission()
    results['contact_submit'] = contact_success
    
    # Test 4: Contact validation
    results['contact_validation'] = test_contact_validation()
    
    # Test 5: Messages endpoint
    results['messages'] = test_messages_endpoint()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, passed_test in results.items():
        status = "✅ PASS" if passed_test else "❌ FAIL"
        print(f"{test_name.upper()}: {status}")
        if passed_test:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests PASSED!")
        return 0
    else:
        print("⚠️  Some backend API tests FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())