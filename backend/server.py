from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ─── Models ───────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    id: str

# ─── Seed Data ────────────────────────────────────────────

SEED_DATA = {
    "personalInfo": {
        "name": "Mayank Arora",
        "tagline": "I build things that work, break things to learn, and ship things that matter.",
        "description": "2nd Year B.Tech IT \u2022 Cybersecurity (Red Team) \u2022 ML Builder \u2022 Full-Stack Developer \u2022 New Delhi, India",
        "badge": "Open to Internships & Freelance",
        "photo": "https://customer-assets.emergentagent.com/job_playboy-console/artifacts/8k6hbkew_MayankPhoto.jpeg",
        "photoBadge": "TryHackMe \u2014 106 Rooms \u2713",
        "resumeUrl": "https://customer-assets.emergentagent.com/job_f31ad329-4849-4720-a320-110878309b7a/artifacts/wa9ewhfh_MayankAroraResume.pdf",
        "socials": {
            "github": "https://github.com/mayankarora2302",
            "linkedin": "https://www.linkedin.com/in/mayank-arora-1b81a0349",
            "instagram": "https://www.instagram.com/mayank.arora0",
            "email": "mailto:mayankarora2302@gmail.com"
        }
    },
    "aboutContent": {
        "heading": "A Builder at the Intersection of Security & Code",
        "body": "I'm Mayank \u2014 a 2nd year IT student who got tired of just studying cybersecurity and decided to actually build for it.\n\nFrom writing blind SQL injection scripts in PortSwigger labs, to shipping a RAM-only privacy OS for Raspberry Pi, to training fraud detection models that actually deploy \u2014 I like my learning to leave something behind.\n\nI've won hardware competitions, placed Top 15 in an international hackathon with 17,000+ participants, and sold freelance websites to real clients through a brand I built and marketed myself.\n\nOutside of a screen, I'm on a tennis court, inside a good book, or quietly planning my next trip.\n\nCurrently looking for internships and freelance opportunities in security, ML, or full-stack development.",
        "terminal": {
            "title": "mayank@portfolio:~$",
            "commands": [
                {
                    "input": "whoami",
                    "output": "Cybersecurity Enthusiast | ML Builder | Web Dev | Hardware Tinkerer"
                },
                {
                    "input": "skills --list",
                    "output": "[Cybersec]   Burp Suite \u00b7 Nmap \u00b7 Wireshark \u00b7 SQLi \u00b7 OPSEC\n[ML/AI]      XGBoost \u00b7 Optuna \u00b7 Scikit-learn \u00b7 FastAPI\n[Web]        React \u00b7 Node.js \u00b7 MongoDB \u00b7 Express \u00b7 HTML/CSS/JS\n[Hardware]   RPi \u00b7 RPi Pico \u00b7 OLED \u00b7 MPU-6050 \u00b7 Embedded C\n[DSA]        Python \u00b7 C++ \u00b7 LeetCode \u2014 Actively Practicing"
                },
                {
                    "input": "status",
                    "output": "Open to: Internships & Freelance  \u2713\nCurrently: Building & Learning   \u2713"
                }
            ]
        }
    },
    "skillsData": {
        "heading": "What I Work With",
        "sub": "Two tracks. One developer.",
        "security": [
            "Burp Suite", "Nmap", "Wireshark", "Metasploit (basics)",
            "SQL Injection / Web Exploitation", "Privilege Escalation",
            "Penetration Testing Fundamentals", "Linux / Bash",
            "Tor / Network Anonymization", "OPSEC & Anti-Forensics",
            "Raspberry Pi (Security Hardware)", "TryHackMe (106 Rooms)",
            "Networking Fundamentals", "OS Internals"
        ],
        "dev": [
            "Python", "JavaScript", "C", "C++",
            "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs",
            "XGBoost", "Scikit-learn", "Optuna", "Pandas", "NumPy", "FastAPI",
            "HTML", "CSS", "Git / GitHub", "GitHub Pages",
            "Raspberry Pi Pico", "Embedded C", "OLED", "MPU-6050",
            "SQL", "Fluvio (Streaming)", "Stellar (Blockchain)"
        ]
    },
    "projectsData": {
        "heading": "Things I've Actually Built",
        "sub": "Not tutorials. Real projects with real decisions.",
        "projects": [
            {
                "id": "fraudhawk",
                "title": "FraudHawk \u2014 Cross-Border Fraud Detection Engine",
                "tags": ["ML", "FastAPI", "XGBoost", "Blockchain"],
                "achievement": "Top 15 \u2014 Hackhazards'25",
                "featured": True,
                "description": "Built to tackle one of the hardest fraud patterns to detect \u2014 cross-border payment anomalies, where fraud hides inside geography mismatches, device switches, and irregular transaction timing.\n\nThe ML pipeline uses XGBoost with custom feature emphasis: IsFlaggedBefore is boosted to prioritize prior risk, DeviceChange is treated as a stronger anomaly signal, and IsAmountUsualForUser flags cross-border amount irregularities.\n\nInstead of a default 0.5 cutoff, the model computes the full precision-recall curve and selects the F1-maximizing threshold \u2014 directly addressing class imbalance that breaks most basic classifiers.\n\nHyperparameter tuning runs via Optuna across 80 trials with Stratified K-Fold cross-validation. The model deploys as a FastAPI endpoint returning fraud prediction, probability score, and the exact threshold used \u2014 auditable, not a black box.\n\nAt Hackhazards'25, teammates added a frontend and Stellar blockchain settlement layer \u2014 transactions that pass the risk check are settled on-chain, adding AML compliance and full transparency.",
                "stats": ["Top 15 \u2014 17,000+ Participants", "80 Optuna Trials", "Live FastAPI Endpoint", "Blockchain Settlement"],
                "tech": ["Python", "XGBoost", "Optuna", "Scikit-learn", "FastAPI", "Fluvio", "Stellar"],
                "links": {
                    "github": "https://github.com/mayankarora2302/fraud_detection_model-api",
                    "details": "https://github.com/mayankarora2302/FraudHawk"
                }
            },
            {
                "id": "ghostpi",
                "title": "GhostPi \u2014 RAM-Only Privacy OS for Raspberry Pi",
                "tags": ["Cybersecurity", "Raspberry Pi", "OPSEC", "Open Source", "Community"],
                "featured": True,
                "description": "Tails OS is brilliant \u2014 but it only works on x86 machines. The entire Raspberry Pi community had no equivalent: a zero-trace, RAM-only privacy OS built for ARM boards. GhostPi was built to fill that gap.\n\nThe OS runs entirely in RAM. Nothing is written to the SD card during a session. On shutdown, everything disappears \u2014 no logs, no files, no history. Every boot is a clean, identical fresh start.\n\nTor is pre-installed and configured, routing all traffic through the anonymization network by default. The system is stripped of unnecessary services to stay lightweight on Pi hardware.\n\nThe final output is a ready-to-flash .img.xz image \u2014 flash it with Balena Etcher, boot, and you're running a private session immediately. No configuration.\n\nBuilt as a genuine community contribution, inspired by prior hands-on work running a live Tor middle relay on RPi 4 \u2014 12\u201315 active channels sustained over 13 hours, thousands of real anonymized requests routed through a home network with dynamic IP and manual port forwarding.",
                "stats": ["Tor Pre-installed", "Zero Trace on Shutdown", "Flashable .img.xz", "ARM / Raspberry Pi Native"],
                "tech": ["Raspberry Pi", "Linux", "Tor", "Bash", "OPSEC"],
                "links": {
                    "github": "https://github.com/mayankarora2302/ghostpi",
                    "download": "https://drive.google.com/drive/folders/1AgxCiRS1xaKek3X4KrP99bhoD9yTA-XV"
                }
            },
            {
                "id": "playboy",
                "title": "Play Boy \u2014 Custom Retro Gaming Console",
                "tags": ["Embedded Systems", "Raspberry Pi Pico", "Hardware"],
                "achievement": "3rd Place \u2014 LogicX",
                "description": "A fully custom-built retro gaming console \u2014 not a kit, not a clone. Designed and soldered from scratch with three complete classic games implemented from the ground up: Pong, Breakout/Brick Breaker, and Snake.\n\nThe standout engineering challenge was tilt-controlled Pong via the MPU-6050 6-axis accelerometer \u2014 mapping raw gyroscope data to smooth, responsive in-game paddle movement required careful calibration and dead-zone tuning.\n\nHardware:\n\u2014 Brain: Raspberry Pi Pico (RP2040)\n\u2014 Display: High-contrast OLED\n\u2014 Input: MPU-6050 accelerometer (tilt) + tactile buttons\n\u2014 Fully self-contained, portable form factor\n\nWon 3rd Place at the LogicX DLCD Project Competition.",
                "stats": ["3rd Place \u2014 LogicX", "RPi Pico + OLED", "Tilt Controls via Accelerometer", "3 Games Built from Scratch"],
                "tech": ["Raspberry Pi Pico", "Embedded C", "OLED", "MPU-6050"],
                "links": {
                    "linkedin": "https://www.linkedin.com/posts/mayank-arora-1b81a0349_embeddedsystems-retrogaming-mpu6050-activity-7394058667924344833-FAgd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFcPBxwB5z3yBHl0BEuODhjtp_UQYdOFPqM"
                }
            },
            {
                "id": "antibiotic",
                "title": "Predictive Antibiotic Residue Tracking System",
                "tags": ["ML", "Food Safety", "Explainability"],
                "inProgress": True,
                "description": "An ongoing ML project targeting a real regulatory problem: antibiotic residues in livestock reach human food supply when animals are slaughtered before drugs have fully metabolized \u2014 causing antibiotic resistance and food safety violations globally.\n\nThe system predicts drug metabolism rates, half-life curves, and safe withdrawal periods for specific antibiotics in specific livestock using synthetic pharmacokinetic training data.\n\nThe focus is not just prediction accuracy but explainability \u2014 regulators need to understand why a batch is flagged, not just that it is. SHAP-based explainability is a core planned output.\n\nUse case: input drug administered, dosage, animal weight, and treatment date \u2014 the model outputs the predicted safe slaughter date with a confidence interval.",
                "tech": ["Python", "Scikit-learn", "SHAP (planned)", "Pandas", "Synthetic Data Generation"],
                "links": {}
            }
        ]
    },
    "labsData": {
        "heading": "In The Lab",
        "sub": "Controlled environments. Real techniques.",
        "entries": [
            {
                "id": "tryhackme",
                "title": "TryHackMe \u2014 Jr. Penetration Tester Path",
                "description": "118 rooms completed across web exploitation, network enumeration, privilege escalation, Linux fundamentals, and full attack flow methodology.\nCovered: Metasploit \u00b7 Burp Suite \u00b7 Nmap and many more",
                "badges": ["Certificates Available"],
                "link": {"label": "TryHackMe Profile", "url": "https://tryhackme.com/p/mayankarora"}
            },
            {
                "id": "sqli",
                "title": "Blind SQL Injection \u2014 PortSwigger Lab",
                "description": "Built a Python script from scratch implementing boolean-based blind SQLi via cookie injection \u2014 no sqlmap, no automation shortcuts.\n\nTechnique: Baseline false-condition response length established first, then each character of the administrator password extracted one-by-one by testing the full charset until a response length deviation is detected.\nThis demonstrates attack mechanism understanding at the HTTP response level.",
                "tools": "Python \u00b7 Requests",
                "link": {"label": "GitHub", "url": "https://github.com/mayankarora2302/blind_sql_script"}
            },
            {
                "id": "tor-relay",
                "title": "Live Tor Middle Relay \u2014 Raspberry Pi 4",
                "description": "Deployed a functional Tor middle relay on RPi 4 Model B on a home network.\n12\u201315 active channels sustained over 13 continuous hours.\nThousands of real anonymized requests routed through the relay.\nChallenges solved: dynamic public IP, port forwarding, ISP routing, IP subnetting.",
                "note": "Middle relay only \u2014 no hidden services, no data stored.",
                "link": {"label": "LinkedIn Post", "url": "https://www.linkedin.com/posts/mayank-arora-1b81a0349_cybersecurity-tornetwork-raspberrypi-activity-7304086895783792640-PA3T?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFcPBxwB5z3yBHl0BEuODhjtp_UQYdOFPqM"}
            },
            {
                "id": "vuln-analysis",
                "title": "Vulnerability Analysis Practice",
                "description": "Actively on TryHackMe\nOngoing hands-on tool usage in controlled lab environments.\nTraffic analysis and packet inspection with Wireshark.\nPort scanning and service enumeration with Nmap.\nWeb application vulnerability testing with Burp Suite.\nAnd many more tools"
            }
        ]
    },
    "freelanceData": {
        "heading": "Real Clients. Real Deadlines.",
        "sub": "Web development isn't just side practice \u2014 I've sold it.",
        "featured": {
            "title": "Qpid \u2014 Personalized Valentine's Website Campaign",
            "description": "Built a micro-brand from scratch \u2014 designed and sold premium personalized websites (using industrial frameworks like Next.js) as Valentine's Day gifts to real paying clients.\n\nCreated the Instagram page @qpid_dot_com, ran Meta ads to acquire customers, and handled every step of delivery: client brief \u2192 design \u2192 customization \u2192 deployment \u2192 revisions. End to end, solo.\n\nNot a freelance platform gig. A self-run campaign from zero.",
            "stats": ["Real Paying Clients", "Meta Ads Campaign", "End-to-End Solo Delivery", "Brand Built from Scratch"],
            "tech": ["HTML", "CSS", "JavaScript", "GitHub Pages"],
            "link": "https://www.instagram.com/qpid_dot_com?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        },
        "experiments": [
            {"title": "Dice Game", "icon": "Dice5", "link": "https://mayankarora2302.github.io/dice-game/"},
            {"title": "Drum Set", "icon": "Music", "link": "https://mayankarora2302.github.io/drum-set/"},
            {"title": "Simon Game", "icon": "CircleDot", "link": "https://mayankarora2302.github.io/Simon_Game/"},
            {"title": "QR Code Generator", "icon": "QrCode", "link": "https://github.com/mayankarora2302/SimpleQRGenerator"}
        ]
    },
    "dsaData": {
        "heading": "Problem Solving & DSA",
        "sub": "Because clean code starts with clear thinking.",
        "platform": "LeetCode",
        "profileLink": "https://leetcode.com/u/mayankarora2302/",
        "username": "mayankarora2302",
        "status": "Actively Practicing",
        "topics": ["Arrays", "Strings", "Linked Lists", "Binary Search", "Recursion", "Trees", "Dynamic Programming", "Sorting", "Hashing", "Stack & Queue"],
        "languages": ["Python", "C++"],
        "contextCopy": "DSA isn't just interview prep for me \u2014 it's how I think through problems before writing a single line of code.\n\nCurrently working through LeetCode systematically, building pattern recognition across core data structures and algorithms.\n\nThe goal isn't to grind numbers \u2014 it's to get fast at seeing the right approach before touching the keyboard."
    },
    "timelineData": {
        "heading": "Milestones",
        "events": [
            {"icon": "Trophy", "title": "Top 15 \u2014 Hackhazards'25 International Hackathon", "description": "17,000+ participants registered \u00b7 InfinyOn Technology Track", "year": "2025"},
            {"icon": "Trophy", "title": "3rd Place \u2014 LogicX DLCD Hardware Competition", "description": "Custom retro gaming console \u00b7 Raspberry Pi Pico", "year": "2025"},
            {"icon": "CheckCircle", "title": "Selected \u2014 Smart India Hackathon (SIH) 2025", "description": "Project contributor selection", "year": "2025"},
            {"icon": "Shield", "title": "106 Rooms \u2014 TryHackMe", "description": "Jr. Penetration Tester Path Completed", "year": "2024\u20132025"},
            {"icon": "GraduationCap", "title": "B.Tech Information Technology \u2014 BPIT, GGSIPU", "description": "2024 \u2013 2028 \u00b7 New Delhi", "year": "2024"}
        ]
    },
    "hobbiesData": {
        "heading": "Beyond The Screen",
        "sub": "A few things that keep me human.",
        "items": [
            {"icon": "CircleDot", "title": "Tennis", "description": "A few months in and already obsessed."},
            {"icon": "BookOpen", "title": "Reading", "description": "Hindi and English literature both. Good writing is good writing."},
            {"icon": "Plane", "title": "Travel", "description": "Student budget. Big plans."},
            {"icon": "Wrench", "title": "Hardware Tinkering", "description": "If it has a GPIO pin, I'll probably build something with it."}
        ]
    },
    "contactData": {
        "heading": "Let's Build Something",
        "sub": "Internship, freelance project, or just a conversation about security \u2014 I'm around.",
        "copy": "I'm actively looking for internship opportunities in cybersecurity and web development, and I take on selective freelance web projects.\n\nIf you've read this far, we probably have something to talk about.",
        "ctaEmail": "mailto:mayankarora2302@gmail.com",
        "contacts": [
            {"icon": "Mail", "label": "mayankarora2302@gmail.com", "href": "mailto:mayankarora2302@gmail.com"},
            {"icon": "Phone", "label": "+91 94682 29653", "href": "tel:+919468229653"},
            {"icon": "Github", "label": "github.com/mayankarora2302", "href": "https://github.com/mayankarora2302"},
            {"icon": "Linkedin", "label": "LinkedIn Profile", "href": "https://www.linkedin.com/in/mayank-arora-1b81a0349"},
            {"icon": "Instagram", "label": "@mayank.arora0", "href": "https://www.instagram.com/mayank.arora0"}
        ]
    },
    "navLinks": [
        {"label": "About", "href": "#about"},
        {"label": "Skills", "href": "#skills"},
        {"label": "Projects", "href": "#projects"},
        {"label": "Labs", "href": "#labs"},
        {"label": "Contact", "href": "#contact"}
    ]
}

# ─── Startup: Seed DB ─────────────────────────────────────

@app.on_event("startup")
async def seed_portfolio():
    existing = await db.portfolio.find_one({"_type": "portfolio"})
    if not existing:
        await db.portfolio.insert_one({**SEED_DATA, "_type": "portfolio"})
        logger.info("Portfolio data seeded into MongoDB")
    else:
        logger.info("Portfolio data already exists in MongoDB")

# ─── Routes ───────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Mayank Arora Portfolio API"}

@api_router.get("/portfolio")
async def get_portfolio():
    doc = await db.portfolio.find_one({"_type": "portfolio"})
    if not doc:
        raise HTTPException(status_code=404, detail="Portfolio data not found")
    doc.pop("_id", None)
    doc.pop("_type", None)
    return doc

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(msg: ContactMessage):
    message_doc = {
        "id": str(uuid.uuid4()),
        "name": msg.name,
        "email": msg.email,
        "message": msg.message,
        "created_at": datetime.utcnow().isoformat()
    }
    await db.messages.insert_one(message_doc)
    logger.info(f"New contact message from {msg.name} ({msg.email})")
    return ContactResponse(success=True, id=message_doc["id"])

@api_router.get("/messages")
async def get_messages():
    messages = await db.messages.find().sort("created_at", -1).to_list(100)
    for m in messages:
        m.pop("_id", None)
    return messages

# ─── App Setup ────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
