document.addEventListener("DOMContentLoaded", () => {
  // Card flip animation for tester cards
  const testerCards = document.querySelectorAll(".tester-card")
  testerCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.querySelector(".card-inner").classList.toggle("flipped")
    })
  })

  // Checklist functionality
  const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]')
  checklistItems.forEach((item) => {
    item.addEventListener("change", function () {
      const details = this.nextElementSibling.nextElementSibling
      if (this.checked) {
        details.style.display = "block"
      } else {
        details.style.display = "none"
      }
    })
  })

  // Diagnostic tool functionality
  const startDiagnosticBtn = document.getElementById("startDiagnostic")
  const resetDiagnosticBtn = document.getElementById("resetDiagnostic")
  const diagnosticOutput = document.getElementById("diagnosticOutput")
  const steps = document.querySelectorAll(".diagnostic-steps .step")

  if (startDiagnosticBtn && resetDiagnosticBtn) {
    startDiagnosticBtn.addEventListener("click", () => {
      runDiagnostic()
    })

    resetDiagnosticBtn.addEventListener("click", () => {
      resetDiagnostic()
    })
  }

  function runDiagnostic() {
    resetDiagnostic()

    let currentStep = 0
    const messages = [
      "Initializing system...",
      "Setting zero reference point...",
      "Measuring standard reference...",
      "Calculating calibration adjustments...",
      "Verifying calibration accuracy...",
    ]

    function processStep() {
      if (currentStep < steps.length) {
        steps[currentStep].classList.add("active")
        steps[currentStep].querySelector(".step-status").textContent = "In Progress"

        diagnosticOutput.innerHTML += `<div>${messages[currentStep]}</div>`
        diagnosticOutput.scrollTop = diagnosticOutput.scrollHeight

        setTimeout(() => {
          steps[currentStep].classList.remove("active")
          steps[currentStep].classList.add("completed")
          steps[currentStep].querySelector(".step-status").textContent = "Completed"

          diagnosticOutput.innerHTML += `<div>Step ${currentStep + 1} completed successfully.</div>`
          diagnosticOutput.scrollTop = diagnosticOutput.scrollHeight

          currentStep++
          if (currentStep < steps.length) {
            setTimeout(processStep, 1500)
          } else {
            diagnosticOutput.innerHTML += `<div>Diagnostic complete. All systems calibrated.</div>`
            diagnosticOutput.scrollTop = diagnosticOutput.scrollHeight
          }
        }, 2000)
      }
    }

    processStep()
  }

  function resetDiagnostic() {
    if (diagnosticOutput) {
      diagnosticOutput.innerHTML = "System ready for calibration diagnostic..."

      steps.forEach((step) => {
        step.classList.remove("active", "completed")
        step.querySelector(".step-status").textContent = "Pending"
      })
    }
  }

  // Gage interactive functionality
  const hotspots = document.querySelectorAll(".hotspot")
  const partsList = document.querySelectorAll(".gage-parts-list li")
  const partTitle = document.getElementById("partTitle")
  const partDescription = document.getElementById("partDescription")

  const partDetails = {
    dial: {
      title: "Dial Indicator",
      description:
        "The dial indicator displays measurement readings. It consists of a graduated dial face and a pointer that moves in response to the spindle movement.",
    },
    spindle: {
      title: "Spindle",
      description:
        "The spindle is the moving part that contacts the workpiece. Its movement is translated into the dial reading.",
    },
    base: {
      title: "Base",
      description:
        "The base provides stability and a reference surface for measurements. It may include mounting options for different applications.",
    },
    anvil: {
      title: "Anvil",
      description:
        "The anvil provides a reference surface opposite to the spindle. The workpiece is measured between the anvil and spindle.",
    },
  }

  function updatePartInfo(part) {
    if (partTitle && partDescription && partDetails[part]) {
      // Clear all active states first
      hotspots.forEach((h) => h.classList.remove("active"))
      partsList.forEach((p) => p.classList.remove("active"))

      // Set active state for the selected part
      document.querySelectorAll(`[data-part="${part}"]`).forEach((el) => {
        el.classList.add("active")
      })

      // Update the info panel with animation
      partTitle.style.opacity = 0
      partDescription.style.opacity = 0

      setTimeout(() => {
        partTitle.textContent = partDetails[part].title
        partDescription.textContent = partDetails[part].description
        partTitle.style.opacity = 1
        partDescription.style.opacity = 1
      }, 200)
    }
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", function () {
      const part = this.getAttribute("data-part")
      updatePartInfo(part)
    })
  })

  partsList.forEach((item) => {
    item.addEventListener("click", function () {
      const part = this.getAttribute("data-part")
      updatePartInfo(part)
    })
  })

  // Toggle content for isolation options
  const toggleButtons = document.querySelectorAll(".toggle-content")
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.previousElementSibling
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block"
        this.textContent = "Hide Details"
      } else {
        content.style.display = "none"
        this.textContent = "View Details"
      }
    })
  })

  // Reinstallation guide toggle
  const viewReinstallBtn = document.querySelector(".view-reinstall")
  if (viewReinstallBtn) {
    viewReinstallBtn.addEventListener("click", function () {
      const guide = document.querySelector(".reinstall-guide")
      if (guide.style.display === "none" || guide.style.display === "") {
        guide.style.display = "block"
        this.textContent = "Hide Reinstallation Guide"
      } else {
        guide.style.display = "none"
        this.textContent = "View Reinstallation Guide"
      }
    })
  }

  // Installation steps navigation
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")
  const completeButton = document.querySelector(".complete-installation")
  const progressBar = document.querySelector(".progress")

  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".step-item")
      const stepNumber = Number.parseInt(currentStep.getAttribute("data-step"))
      const nextStep = document.querySelector(`.step-item[data-step="${stepNumber + 1}"]`)

      if (nextStep) {
        currentStep.classList.remove("active")
        nextStep.classList.add("active")

        if (progressBar) {
          progressBar.style.width = `${stepNumber * 33}%`
        }
      }
    })
  })

  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".step-item")
      const stepNumber = Number.parseInt(currentStep.getAttribute("data-step"))
      const prevStep = document.querySelector(`.step-item[data-step="${stepNumber - 1}"]`)

      if (prevStep) {
        currentStep.classList.remove("active")
        prevStep.classList.add("active")

        if (progressBar) {
          progressBar.style.width = `${(stepNumber - 2) * 33}%`
        }
      }
    })
  })

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      if (progressBar) {
        progressBar.style.width = "100%"
      }

      alert("Installation complete! System is ready for operation.")
    })
  }

  // Add animation to checklist items
  const checkListItemsAnimated = document.querySelectorAll('.checklist-item input[type="checkbox"]')
  checkListItemsAnimated.forEach((item) => {
    item.addEventListener("change", function () {
      const details = this.nextElementSibling.nextElementSibling
      const label = this.nextElementSibling

      if (this.checked) {
        details.style.display = "block"
        label.classList.add("checked")
      } else {
        details.style.display = "none"
        label.classList.remove("checked")
      }
    })
  })
})

