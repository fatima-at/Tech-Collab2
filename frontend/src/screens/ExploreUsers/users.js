export const users = [
    {
      id: 1,
      name: "John Doe",
      profile_picture: "https://i.pravatar.cc/150?img=1",
      bio: "Web Developer with a passion for AI.",
      general_field: "Software Engineering",
      skills: ["JavaScript", "React", "Node.js"],
      linkedin_profile: "https://linkedin.com/in/johndoe",
      followers: [
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Brown" },
      ],
      userProjects: [
        {
          id: 1,
          title: "Personal Website",
          description:
            "A personal portfolio website built using React and Node.js.",
          status: "Completed",
          url: "https://johndoe.com",
          technologies: ["React", "Node.js", "CSS"],
          start_date: "2021-01-01",
          end_date: "2021-03-01",
        },
      ],
    },
    {
      id: 2,
      name: "Alice Johnson",
      profile_picture: "https://i.pravatar.cc/150?img=2",
      bio: "Data Scientist with a focus on predictive analytics and machine learning.",
      general_field: "Data Science",
      skills: ["Python", "TensorFlow", "Pandas"],
      linkedin_profile: "https://linkedin.com/in/alicejohnson",
      followers: [
        { id: 1, name: "John Doe" },
        { id: 3, name: "Michael Brown" },
      ],
      userProjects: [
        {
          id: 2,
          title: "AI Model for Predictive Analytics",
          description:
            "Developed a model to predict customer churn using machine learning.",
          status: "Ongoing",
          url: null,
          technologies: ["Python", "TensorFlow", "Pandas"],
          start_date: "2022-05-15",
          end_date: null,
        },
      ],
    },
    {
      id: 3,
      name: "Michael Brown",
      profile_picture: "https://i.pravatar.cc/150?img=3",
      bio: "Cloud Engineer specializing in AWS infrastructure and DevOps.",
      general_field: "Cloud Engineering",
      skills: ["AWS", "Terraform", "Docker"],
      linkedin_profile: "https://linkedin.com/in/michaelbrown",
      followers: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Alice Johnson" },
      ],
      userProjects: [
        {
          id: 3,
          title: "AWS Infrastructure Setup",
          description:
            "Built a scalable cloud infrastructure using AWS and Terraform.",
          status: "Completed",
          url: null,
          technologies: ["AWS", "Terraform", "Docker"],
          start_date: "2021-09-01",
          end_date: "2022-01-10",
        },
      ],
    },
    {
      id: 4,
      name: "Sophia Lee",
      profile_picture: "https://i.pravatar.cc/150?img=4",
      bio: "Mobile Developer passionate about creating seamless user experiences.",
      general_field: "Mobile Development",
      skills: ["Kotlin", "Swift", "Flutter"],
      linkedin_profile: "https://linkedin.com/in/sophialee",
      followers: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Alice Johnson" },
      ],
      userProjects: [
        {
          id: 4,
          title: "Cross-Platform Mobile App",
          description:
            "Developed a mobile app using Flutter for iOS and Android.",
          status: "Completed",
          url: "https://sophiaapp.com",
          technologies: ["Flutter", "Dart", "Firebase"],
          start_date: "2020-11-01",
          end_date: "2021-04-01",
        },
      ],
    },
    {
      id: 5,
      name: "David Kim",
      profile_picture: "https://i.pravatar.cc/150?img=5",
      bio: "Cybersecurity expert focused on penetration testing and network security.",
      general_field: "Cybersecurity",
      skills: ["Penetration Testing", "Kali Linux", "Wireshark"],
      linkedin_profile: "https://linkedin.com/in/davidkim",
      followers: [
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Sophia Lee" },
      ],
      userProjects: [
        {
          id: 5,
          title: "Network Security Audit",
          description:
            "Conducted a comprehensive network security audit for a large enterprise.",
          status: "Ongoing",
          url: null,
          technologies: ["Kali Linux", "Wireshark", "Nmap"],
          start_date: "2022-07-01",
          end_date: null,
        },
      ],
    },
  ];