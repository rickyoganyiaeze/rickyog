// ========== NAVIGATION FUNCTIONALITY ==========
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle mobile menu
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ========== CONTACT FORM HANDLING WITH FORMSPREE ==========
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)

  try {
    const response = await fetch("https://formspree.io/f/your-actual-form-id", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })

    if (response.ok) {
      formMessage.textContent = "✓ Message sent successfully! I'll get back to you soon."
      formMessage.classList.add("show", "success")
      contactForm.reset()
      setTimeout(() => {
        formMessage.classList.remove("show")
      }, 5000)
    } else {
      throw new Error("Form submission failed")
    }
  } catch (error) {
    console.error("[v0] Form error:", error)
    formMessage.textContent = "✗ Failed to send message. Please try again."
    formMessage.classList.add("show", "error")
    setTimeout(() => {
      formMessage.classList.remove("show")
    }, 5000)
  }
})

// ========== SMOOTH SCROLL ANIMATION ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  // Animate section elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all cards and elements
  document.querySelectorAll(".skill-item, .service-card, .project-card, .testimonial-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// ========== ACTIVE NAV HIGHLIGHT ON SCROLL ==========
const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})
