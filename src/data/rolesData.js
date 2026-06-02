export const rolesData = {
  "AI Engineer": {
    skills: ["Python", "LLMs", "Prompt Engineering", "RAG", "FastAPI", "Vector Databases", "Docker"],
    company: {
      name: "MediAssist AI",
      industry: "Healthcare",
      mission: "We run a leading healthcare platform and need an AI chatbot to automate our hospital appointment bookings and answer customer medical inquiries safely."
    },
    pmRequirements: [
      "The chatbot must support English and Hindi.",
      "Must include a symptom checker module.",
      "Needs to handle appointment booking via natural language.",
      "Ensure a 99% uptime architecture."
    ],
    techConstraints: [
      "Use LangChain or LlamaIndex.",
      "Backend strictly in FastAPI.",
      "Use an open-source Vector Database (e.g., ChromaDB, Qdrant).",
      "Do NOT use paid APIs (no OpenAI) - simulate local models."
    ],
    midwayTwist: {
      from: "AI Client",
      message: "Hey team, big change from the stakeholders. We now need voice support integrated immediately (WhatsApp voice notes to text). Can you adapt the architecture?",
      impacts: ["Requires Speech-to-Text integration", "Real-time latency handling"]
    },
    evaluation: {
      strengths: ["API Development", "LLM Integration", "Prompt Engineering"],
      weaknesses: ["Docker", "Deployment", "System Design"],
      score: 78,
      level: "Junior AI Engineer",
      nextChallenge: "Deploy the chatbot to production using Docker and Kubernetes."
    }
  },
  "Data Scientist": {
    skills: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "SQL", "Data Visualization", "Statistics"],
    company: {
      name: "FinPredict Analytics",
      industry: "Fintech",
      mission: "We need a robust credit scoring model to evaluate loan applicants using alternative data sources, ensuring fair lending practices."
    },
    pmRequirements: [
      "Model needs to predict default probability with > 85% accuracy.",
      "Include a dashboard for loan officers.",
      "Handle missing data without dropping rows."
    ],
    techConstraints: [
      "Use XGBoost or LightGBM.",
      "Dashboard in Streamlit.",
      "Database must be PostgreSQL.",
      "Ensure model explainability (SHAP values)."
    ],
    midwayTwist: {
      from: "AI Client",
      message: "We just found out there's a strong bias against younger applicants in the current dataset. You need to implement bias mitigation before the final release.",
      impacts: ["Fairness constraints", "Model retraining"]
    },
    evaluation: {
      strengths: ["Data Preprocessing", "Model Accuracy", "Visualization"],
      weaknesses: ["MLOps", "Model Explainability", "SQL Optimization"],
      score: 82,
      level: "Associate Data Scientist",
      nextChallenge: "Implement an automated ML pipeline using Airflow or Kubeflow."
    }
  },
  "Product Manager": {
    skills: ["Agile", "User Stories", "Roadmapping", "A/B Testing", "Jira", "Figma", "Data Analysis"],
    company: {
      name: "EcoComm",
      industry: "E-Commerce",
      mission: "We are launching a sustainable e-commerce platform and need a complete product roadmap for the vendor onboarding experience."
    },
    pmRequirements: [
      "Create detailed user stories for vendor registration.",
      "Design a wireframe for the vendor dashboard.",
      "Define KPIs for the launch phase."
    ],
    techConstraints: [
      "Use agile methodology (2-week sprints).",
      "Mockups must be mobile-first.",
      "Integrate sustainability metrics in the dashboard."
    ],
    midwayTwist: {
      from: "AI CEO",
      message: "Competitor X just launched a 1-click vendor import feature. We need to pivot our roadmap to prioritize a 'Shopify Import' tool immediately. Update the sprint backlog.",
      impacts: ["Roadmap reprioritization", "Scope creep management"]
    },
    evaluation: {
      strengths: ["User Story Mapping", "Agile Execution", "Communication"],
      weaknesses: ["Technical Feasibility Assessment", "KPI Definition"],
      score: 75,
      level: "Associate Product Manager",
      nextChallenge: "Conduct user interviews and run an A/B test on the new import feature."
    }
  },
  "Business Analyst": {
    skills: ["Excel", "Tableau", "SQL", "Stakeholder Management", "Process Modeling", "Requirements Elicitation"],
    company: {
      name: "LogiFlow Solutions",
      industry: "Logistics",
      mission: "We need to optimize our last-mile delivery routes. Your task is to analyze current delivery data and propose cost-saving operational changes."
    },
    pmRequirements: [
      "Identify the top 3 bottlenecks in delivery times.",
      "Create a cost-benefit analysis of switching to electric vans.",
      "Present findings in an executive summary."
    ],
    techConstraints: [
      "Analysis must be done in SQL and visualized in Tableau/PowerBI.",
      "Assume a $500k budget cap.",
      "Process models must use BPMN standard."
    ],
    midwayTwist: {
      from: "AI Operations Director",
      message: "Fuel prices just spiked by 20% overnight. We need you to instantly rerun the cost-benefit analysis and propose an emergency mitigation plan.",
      impacts: ["Financial modeling under pressure", "Scenario analysis"]
    },
    evaluation: {
      strengths: ["Data Querying", "Financial Modeling", "Visualization"],
      weaknesses: ["Stakeholder Communication", "BPMN Diagramming"],
      score: 80,
      level: "Junior Business Analyst",
      nextChallenge: "Lead a requirements gathering workshop with the warehouse team."
    }
  },
  "Cybersecurity Analyst": {
    skills: ["Network Security", "Penetration Testing", "SIEM", "Incident Response", "Linux", "Cryptography"],
    company: {
      name: "SecureBank",
      industry: "Banking",
      mission: "We've detected unusual activity on our customer portal. Your job is to analyze the logs, identify the breach, and propose a mitigation strategy."
    },
    pmRequirements: [
      "Analyze the provided Apache access logs for SQL injection or XSS.",
      "Draft an incident response report.",
      "Recommend firewall rule changes."
    ],
    techConstraints: [
      "Use open-source SIEM tools (ELK stack simulation).",
      "Report must follow NIST incident response guidelines.",
      "No direct production access allowed."
    ],
    midwayTwist: {
      from: "AI Tech Lead",
      message: "URGENT: The attacker just escalated privileges and is attempting to exfiltrate the customer database. We need immediate containment instructions, drop the report for now!",
      impacts: ["Crisis management", "Rapid containment strategy"]
    },
    evaluation: {
      strengths: ["Log Analysis", "Threat Identification", "Under-pressure performance"],
      weaknesses: ["Report formatting", "Post-incident forensics"],
      score: 85,
      level: "Junior Security Analyst",
      nextChallenge: "Conduct a full vulnerability scan on the staging environment."
    }
  },
  "Backend Engineer": {
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS"],
    company: {
      name: "StreamFlix",
      industry: "Entertainment",
      mission: "We need a scalable microservice to handle video processing statuses and user watch history."
    },
    pmRequirements: [
      "Create RESTful APIs for CRUD operations on watch history.",
      "Implement a webhook for video processing updates.",
      "Ensure the API responds in < 50ms."
    ],
    techConstraints: [
      "Use Node.js with TypeScript.",
      "Cache recent history using Redis.",
      "Database must be PostgreSQL.",
      "Use Docker for local development."
    ],
    midwayTwist: {
      from: "AI Client",
      message: "Our user base just spiked in Europe. We need the API to support multi-region deployment and data residency laws (GDPR) starting today.",
      impacts: ["Architecture scaling", "Data compliance"]
    },
    evaluation: {
      strengths: ["API Design", "Database Modeling", "Caching Strategy"],
      weaknesses: ["Security best practices", "Multi-region architecture"],
      score: 79,
      level: "Junior Backend Engineer",
      nextChallenge: "Implement OAuth2 authentication and rate limiting."
    }
  }
};
