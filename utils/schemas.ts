users: {
    userId: {
      name: "John Doe",
      email: "johndoe@example.com",
      userType: "student" | "teacher", // Indicates if the user is a student or a teacher
      profilePicture: "URL_to_picture",
      bio: "Short description about user",
      isVerified: true, // (for teachers) Indicates if the teacher is verified
      qualifications: [  // (for teachers) Qualifications for verification
        {
          degree: "Alim",
          institution: "Madrasa XYZ",
          year: "2022",
          certificationUrl: "url_to_certificate"
        }
      ],
      paymentMethods: [  // Store payment methods (if Stripe connected)
        {
          type: "Stripe",
          stripeCustomerId: "stripe_customer_id"
        }
      ]
    }
  }
  