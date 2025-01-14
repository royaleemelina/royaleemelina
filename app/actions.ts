'use server'

export async function submitContactForm(formData: FormData) {
  // Here you would typically send this data to your backend or API
  console.log('Form submitted with data:', Object.fromEntries(formData))
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return a success message
  return { message: 'Thank you for your message. We will get back to you soon!' }
}

