import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { motion, useAnimation } from 'framer-motion'
import { Github, Users, Heart, ChevronRight, Linkedin, Twitter } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LandingPage() {
  const [currentProject, setCurrentProject] = useState(0)
  const [contributions, setContributions] = useState([])
  const [repositories, setRepositories] = useState([])
  const [stats, setStats] = useState([
    { value: 0, label: 'Open Source Contributors' },
    { value: 0, label: 'Projects' },
    { value: 0, label: 'Contributions' },
    { value: 0, label: 'Stars' },
  ])
  const controls = useAnimation()

  const teamMembers = [
    { name: 'Rakshith', role: 'Lead Developer', image: 'https://avatars.githubusercontent.com/u/83587918?v=4', github: 'https://github.com/rakshixh', twitter: '', linkedin: 'https://www.linkedin.com/in/rakshixh/' },
    { name: 'Saurabh', role: 'Member', image: 'https://avatars.githubusercontent.com/u/61317144?v=4', github: 'https://github.com/0xSaurabhx', twitter: 'https://x.com/saurabh_udupi', linkedin: 'https://www.linkedin.com/in/dev-saurabh/' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % repositories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [repositories.length])

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 0.5 }
    })
  }, [currentProject, controls])

  useEffect(() => {
    async function fetchContributions() {
      const headers = {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
      try {
        const response = await axios.get('https://api.github.com/orgs/CodeQuestic/events?per_page=1000', { headers })
        setContributions(response.data)
      } catch (error) {
        console.error('Error fetching contributions:', error)
      }
    }

    async function fetchRepositories() {
      const headers = {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
      try {
        const response = await axios.get('https://api.github.com/orgs/CodeQuestic/repos', { headers })
        const filteredRepos = response.data.filter(repo => repo.name !== '.github')
        setRepositories(filteredRepos)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
    }

    async function fetchStats() {
      const headers = {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
      try {
        const [contributorsResponse, reposResponse, eventsResponse] = await Promise.all([
          axios.get('https://api.github.com/orgs/CodeQuestic/members', { headers }),
          axios.get('https://api.github.com/orgs/CodeQuestic/repos', { headers }),
          axios.get('https://api.github.com/orgs/CodeQuestic/events', { headers })
        ])

        const contributors = contributorsResponse.data.length
        const projects = reposResponse.data.length
        const contributions = eventsResponse.data.length
        const stars = reposResponse.data.reduce((acc, repo) => acc + repo.stargazers_count, 0)

        setStats([
          { value: contributors, label: 'Open Source Contributors' },
          { value: projects, label: 'Projects' },
          { value: contributions, label: 'Contributions' },
          { value: stars, label: 'Stars' },
        ])
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchContributions()
    fetchRepositories()
    fetchStats()
  }, [])

  const truncateDescription = (description, maxLength) => {
    if (!description) return ''
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <Header />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <GrowingNumber key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About CodeQuestic</h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              CodeQuestic is an open-source community dedicated to contributing useful projects to the wider developer ecosystem. Our mission is to foster collaboration, innovation, and knowledge sharing among developers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          {repositories.length > 0 && (
            <motion.div
              key={currentProject}
              animate={controls}
              className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto h-52 overflow-hidden"
            >
              <h3 className="text-2xl font-semibold mb-4">{repositories[currentProject].name}</h3>
              <p className="text-lg mb-6">{truncateDescription(repositories[currentProject].description, 30)}</p>
              <a href={repositories[currentProject].html_url} className="text-[#ff6138] font-semibold hover:underline inline-flex items-center">
                Learn More <ChevronRight size={20} className="ml-1" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Join the Community */}
      <section id="join" className="py-20 bg-gradient-to-r from-[#ff6138] to-[#ff9d7e] text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Join the Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Github size={48} />, title: 'Contribute', description: 'Submit pull requests and help improve our projects' },
              { icon: <Users size={48} />, title: 'Collaborate', description: 'Connect with like-minded developers and share ideas' },
              { icon: <Heart size={48} />, title: 'Support', description: 'Help others by answering questions and providing guidance' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white text-gray-900 rounded-lg shadow-lg p-8 text-center"
              >
                <div className="text-[#ff6138] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className={`flex flex-wrap justify-center gap-8 ${teamMembers.length === 2 ? 'md:justify-center' : ''}`}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.linkedin} className="text-gray-400 hover:text-[#ff6138] transition duration-300">
                    <Linkedin size={20} />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-[#ff6138] transition duration-300">
                    <Twitter size={20} />
                  </a>
                  <a href={member.github} className="text-gray-400 hover:text-[#ff6138] transition duration-300">
                    <Github size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Contributions */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Latest Contributions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributions.slice(0, 6).map((contribution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#ff6138] to-[#ff9d7e] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {contribution.actor.login[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{contribution.actor.login}</h3>
                    <p className="text-sm text-gray-600">{contribution.repo.name}</p>
                  </div>
                </div>
                <p className="text-gray-700">{contribution.payload.commits ? contribution.payload.commits[0].message : 'No commit message'}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function GrowingNumber({ value, label }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const stepValue = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += stepValue
        if (current > value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      const currentRef = ref.current
      return () => {
        if (currentRef) {
          clearInterval(timer)
        }
      }
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[#ff6138] mb-2">
        {displayValue.toLocaleString()}+
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

function useInView(ref, options) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return isIntersecting
}
