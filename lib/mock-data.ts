// This file acts as a temporary database for our mock data.

// Define a type for the newsletter that includes HTML content
export interface NewsletterWithContent {
  id: string
  title: string
  status: "SENT" | "DRAFT" | "SCHEDULED"
  sent_at: string | null
  opens: number
  forwards: number
  htmlContent: string
}

// Add rich HTML content to the mock data
export const mockNewsletters: NewsletterWithContent[] = [
  {
    id: "1",
    title: "The Future of Serverless",
    status: "SENT",
    sent_at: "2024-06-25",
    opens: 1256,
    forwards: 123,
    htmlContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Future of Serverless</title>
      <style>
        body { margin: 0; padding: 0; background-color: #e9e9e9; }
        .email-container { width: 100%; max-width: 800px; margin: 0 auto; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .navbar { padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; background-color: #f7f7f7; border-bottom: 1px solid #dddddd; }
        .navbar .logo { height: 35px; background: transparent; }
        .navbar .nav-links { display: flex; gap: 15px; }
        .navbar .nav-links a { color: #333333; text-decoration: none; font-size: 14px; font-weight: 800; }
        .banner { height: 200px; overflow: hidden; }
        .banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .main-content { display: flex; gap: 20px; padding: 0 20px; }
        .content { flex: 2; padding: 25px 0; color: #333; line-height: 1.6; }
        .content p { margin-bottom: 20px; }
        .content h3 { color: #0d6efd; margin-top: 25px; margin-bottom: 10px; }
        .sidebar { flex: 1; padding: 25px 0 25px 20px; background-color: #f9f9f9; border-left: 1px solid #e0e0e0; }
        .sidebar h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .sidebar .link-item { margin-bottom: 15px; }
        .sidebar .link-item a { color: #0d6efd; text-decoration: none; font-weight: 600; display: block; margin-bottom: 3px; }
        .sidebar .link-item p { font-size: 12px; color: #666; margin: 0; line-height: 1.4; }
        .key-points-table { width: 100%; border-spacing: 15px 0; margin: 20px 0; }
        .key-points-table td { vertical-align: top; }
        .key-points-table .icon { width: 40px; }
        .footer { padding: 20px; text-align: center; background-color: #f7f7f7; color: #777; font-size: 12px; border-top: 1px solid #dddddd; }
        @media screen and (max-width: 800px) {
          .navbar { flex-direction: column; gap: 10px; }
          .navbar .nav-links { gap: 10px; }
          .navbar .nav-links a { font-size: 12px; }
          .main-content { flex-direction: column; padding: 0; }
          .content { padding: 15px; }
          .sidebar { padding: 15px; border-left: 0; border-top: 1px solid #e0e0e0; }
        }
        .divider { border-top: 1px solid #ddd; margin: 20px 0; }
        .video-section { margin-top: 20px; }
        .video-section h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .video-image { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .video-summary { font-size: 12px; color: #666; line-height: 1.4; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="navbar">
          <img src="/transparent-logo.png" alt="Newsletter SaaS Logo" class="logo">
          <div class="nav-links">
            <a href="#intro">Intro</a>
            <a href="#key-points">Key Points</a>
            <a href="#deep-dive">Deep Dive</a>
            <a href="#conclusion">Conclusion</a>
          </div>
        </div>
        <div class="banner">
          <img src="/abstract-blue-network.png" alt="Abstract digital network">
        </div>
        
        <!-- Bulletproof Background Image -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td background="/subtle-texture-pattern.png" bgcolor="#ffffff" valign="top">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px;">
                <v:fill type="tile" src="/subtle-texture-pattern.png" color="#ffffff" />
                <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
              <![endif]-->
              <div>
                <div class="main-content">
                  <div class="content">
                    <h1 id="intro" style="color: #0d6efd;">The Future of Serverless is Now</h1>
                    <h3>The Productivity Revolution</h3>
                    <p>Serverless architecture is no longer a niche technology for early adopters. It's rapidly becoming the standard for building scalable, cost-effective, and resilient applications. The paradigm shift from managing servers to focusing purely on code is unlocking unprecedented levels of productivity for development teams across the globe. This evolution is not just a trend; it's a fundamental change in how we approach software development.</p>
                    <h2 id="key-points" style="color: #0d6efd; border-bottom: 2px solid #eeeeee; padding-bottom: 5px;">Core Advantages</h2>
                    <table class="key-points-table" role="presentation">
                      <tr>
                        <td class="icon"><img src="/dollar-sign-circle.png" alt="Cost Icon" width="40"></td>
                        <td><strong>Reduced Cost:</strong> Pay-per-use models eliminate idle server costs, drastically reducing operational expenses for applications with variable traffic.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/upward-trending-graph.png" alt="Scaling Icon" width="40"></td>
                        <td><strong>Seamless Scaling:</strong> Automatically scale from zero to thousands of requests without any manual intervention, ensuring high availability.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/soaring-rocket.png" alt="Speed Icon" width="40"></td>
                        <td><strong>Faster Time-to-Market:</strong> Developers can focus on writing business logic instead of managing infrastructure, accelerating the development lifecycle.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/simplicity-gear.png" alt="Simplicity Icon" width="40"></td>
                        <td><strong>Simplified Operations:</strong> Abstracting away the underlying servers simplifies deployment and maintenance, reducing the operational burden.</td>
                      </tr>
                    </table>
                    <h3 id="deep-dive">Beyond Simple Functions</h3>
                    <p>As we look ahead, the serverless ecosystem is expanding. We're seeing the rise of serverless databases, storage, and even entire container platforms that manage resources for you. This allows for the construction of complex, event-driven architectures that are both powerful and efficient. The integration of AI and machine learning services into this model further pushes the boundaries of what's possible.</p>
                    <p id="conclusion" style="font-weight: bold; font-style: italic; margin-top: 30px;">Stop managing servers and start building the future; the serverless revolution is waiting for you.</p>
                  </div>
                  <div class="sidebar">
                    <h3>Helpful Links</h3>
                    <div class="link-item">
                      <a href="#">AWS Lambda Documentation</a>
                      <p>Complete guide to building and deploying serverless functions on AWS.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Serverless Framework</a>
                      <p>Open-source framework for building serverless applications across multiple cloud providers.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Vercel Functions</a>
                      <p>Deploy serverless functions with zero configuration and automatic scaling.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Serverless Patterns</a>
                      <p>Collection of proven architectural patterns for serverless applications.</p>
                    </div>
                    <div class="divider"></div>
                    <div class="video-section">
                      <h3>Watch Video</h3>
                      <img src="/serverless-architecture.png" alt="Serverless Architecture Diagram" class="video-image">
                      <p class="video-summary">15-minute deep dive into serverless patterns with real Netflix and Airbnb examples.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
        </table>
        <!-- /Bulletproof Background Image -->

        <div class="footer">
          <p>Newsletter SaaS Inc. &copy; 2024</p>
          <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
        </div>
      </div>
    </body>
    </html>
    `,
  },
  {
    id: "2",
    title: "Glassmorphism is Back",
    status: "DRAFT",
    sent_at: null,
    opens: 0,
    forwards: 0,
    htmlContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Glassmorphism is Back</title>
      <style>
        body { margin: 0; padding: 0; background-color: #e9e9e9; }
        .email-container { width: 100%; max-width: 800px; margin: 0 auto; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .navbar { padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; background-color: #f7f7f7; border-bottom: 1px solid #dddddd; }
        .navbar .logo { height: 35px; background: transparent; }
        .navbar .nav-links { display: flex; gap: 15px; }
        .navbar .nav-links a { color: #333333; text-decoration: none; font-size: 14px; font-weight: 800; }
        .banner { height: 200px; overflow: hidden; }
        .banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .main-content { display: flex; gap: 20px; padding: 0 20px; }
        .content { flex: 2; padding: 25px 0; color: #333; line-height: 1.6; }
        .content p { margin-bottom: 20px; }
        .content h3 { color: #198754; margin-top: 25px; margin-bottom: 10px; }
        .sidebar { flex: 1; padding: 25px 0 25px 20px; background-color: #f9f9f9; border-left: 1px solid #e0e0e0; }
        .sidebar h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .sidebar .link-item { margin-bottom: 15px; }
        .sidebar .link-item a { color: #198754; text-decoration: none; font-weight: 600; display: block; margin-bottom: 3px; }
        .sidebar .link-item p { font-size: 12px; color: #666; margin: 0; line-height: 1.4; }
        .key-points-table { width: 100%; border-spacing: 15px 0; margin: 20px 0; }
        .key-points-table td { vertical-align: top; }
        .key-points-table .icon { width: 40px; }
        .footer { padding: 20px; text-align: center; background-color: #f7f7f7; color: #777; font-size: 12px; border-top: 1px solid #dddddd; }
        @media screen and (max-width: 800px) {
          .navbar { flex-direction: column; gap: 10px; }
          .navbar .nav-links { gap: 10px; }
          .navbar .nav-links a { font-size: 12px; }
          .main-content { flex-direction: column; padding: 0; }
          .content { padding: 15px; }
          .sidebar { padding: 15px; border-left: 0; border-top: 1px solid #e0e0e0; }
        }
        .divider { border-top: 1px solid #ddd; margin: 20px 0; }
        .video-section { margin-top: 20px; }
        .video-section h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .video-image { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .video-summary { font-size: 12px; color: #666; line-height: 1.4; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="navbar">
          <img src="/transparent-logo.png" alt="Newsletter SaaS Logo" class="logo">
          <div class="nav-links">
            <a href="#intro">Intro</a>
            <a href="#key-points">Key Points</a>
            <a href="#deep-dive">Deep Dive</a>
            <a href="#conclusion">Conclusion</a>
          </div>
        </div>
        <div class="banner">
          <img src="/frosted-glass-ui.png" alt="Frosted glass UI design">
        </div>
        
        <!-- Bulletproof Background Image -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td background="/subtle-texture-pattern.png" bgcolor="#ffffff" valign="top">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px;">
                <v:fill type="tile" src="/subtle-texture-pattern.png" color="#ffffff" />
                <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
              <![endif]-->
              <div>
                <div class="main-content">
                  <div class="content">
                    <h1 id="intro" style="color: #198754;">Why Glassmorphism is Dominating UI Design</h1>
                    <h3>A Modern Renaissance</h3>
                    <p>You've seen it everywhere, from macOS to mobile apps. The frosted-glass effect, known as Glassmorphism, is making a huge comeback. It creates a sense of depth and hierarchy that users love, layering information in a way that feels both intuitive and visually stunning. This isn't just a fleeting trend; it's a mature design language that adds a touch of elegance and modernity to any interface.</p>
                    <h2 id="key-points" style="color: #198754; border-bottom: 2px solid #eeeeee; padding-bottom: 5px;">Design Principles</h2>
                    <table class="key-points-table" role="presentation">
                      <tr>
                        <td class="icon"><img src="/depth-icon.png" alt="Depth Icon" width="40"></td>
                        <td><strong>Visual Depth:</strong> The blur effect creates a multi-layered interface, helping users perceive the spatial relationship between elements.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/hierarchy-icon.png" alt="Hierarchy Icon" width="40"></td>
                        <td><strong>Clear Hierarchy:</strong> By placing important elements on a higher "layer," you can guide the user's attention effectively.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/modern-icon.png" alt="Modern Icon" width="40"></td>
                        <td><strong>Modern Aesthetic:</strong> Glassmorphism feels fresh and contemporary, aligning your product with current design expectations.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/accessibility-icon.png" alt="Accessibility Icon" width="40"></td>
                        <td><strong>Accessibility First:</strong> When done right, with proper contrast and borders, it can be both beautiful and accessible to all users.</td>
                      </tr>
                    </table>
                    <h3 id="deep-dive">The Art of Implementation</h3>
                    <p>Implementing Glassmorphism requires a careful balance. The key is the background blur, which can be achieved in CSS using the \`backdrop-filter: blur()\` property. However, it's crucial to pair this with a subtle border and a semi-transparent background color to maintain the "glass" illusion and ensure elements are distinguishable from the background. This technique works best when applied to overlays, sidebars, or cards.</p>
                    <p id="conclusion" style="font-weight: bold; font-style: italic; margin-top: 30px;">Don't just design a screen; create a world for your users to explore, one pane of glass at a time.</p>
                  </div>
                  <div class="sidebar">
                    <h3>Helpful Links</h3>
                    <div class="link-item">
                      <a href="#">CSS Backdrop Filter Guide</a>
                      <p>Learn how to implement glassmorphism effects using modern CSS properties.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Figma Glass UI Kit</a>
                      <p>Ready-to-use glassmorphism components and design system for your projects.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Accessibility in Glass Design</a>
                      <p>Best practices for maintaining usability while using transparent design elements.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Performance Optimization</a>
                      <p>Tips for implementing glass effects without impacting page load times.</p>
                    </div>
                    <div class="divider"></div>
                    <div class="video-section">
                      <h3>Watch Video</h3>
                      <img src="/glassmorphism-tutorial.png" alt="Glassmorphism Design Tutorial" class="video-image">
                      <p class="video-summary">12-minute tutorial building glass interfaces from scratch with CSS and Figma files.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
        </table>
        <!-- /Bulletproof Background Image -->

        <div class="footer">
          <p>Newsletter SaaS Inc. &copy; 2024</p>
          <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
        </div>
      </div>
    </body>
    </html>
    `,
  },
  {
    id: "3",
    title: "Building Growth Loops",
    status: "SCHEDULED",
    sent_at: "2024-07-05",
    opens: 0,
    forwards: 0,
    htmlContent: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Building Growth Loops</title>
      <style>
        body { margin: 0; padding: 0; background-color: #e9e9e9; }
        .email-container { width: 100%; max-width: 800px; margin: 0 auto; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .navbar { padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; background-color: #f7f7f7; border-bottom: 1px solid #dddddd; }
        .navbar .logo { height: 35px; background: transparent; }
        .navbar .nav-links { display: flex; gap: 15px; }
        .navbar .nav-links a { color: #333333; text-decoration: none; font-size: 14px; font-weight: 800; }
        .banner { height: 200px; overflow: hidden; }
        .banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .main-content { display: flex; gap: 20px; padding: 0 20px; }
        .content { flex: 2; padding: 25px 0; color: #333; line-height: 1.6; }
        .content p { margin-bottom: 20px; }
        .content h3 { color: #ca9b07; margin-top: 25px; margin-bottom: 10px; }
        .sidebar { flex: 1; padding: 25px 0 25px 20px; background-color: #f9f9f9; border-left: 1px solid #e0e0e0; }
        .sidebar h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .sidebar .link-item { margin-bottom: 15px; }
        .sidebar .link-item a { color: #ca9b07; text-decoration: none; font-weight: 600; display: block; margin-bottom: 3px; }
        .sidebar .link-item p { font-size: 12px; color: #666; margin: 0; line-height: 1.4; }
        .key-points-table { width: 100%; border-spacing: 15px 0; margin: 20px 0; }
        .key-points-table td { vertical-align: top; }
        .key-points-table .icon { width: 40px; }
        .footer { padding: 20px; text-align: center; background-color: #f7f7f7; color: #777; font-size: 12px; border-top: 1px solid #dddddd; }
        @media screen and (max-width: 800px) {
          .navbar { flex-direction: column; gap: 10px; }
          .navbar .nav-links { gap: 10px; }
          .navbar .nav-links a { font-size: 12px; }
          .main-content { flex-direction: column; padding: 0; }
          .content { padding: 15px; }
          .sidebar { padding: 15px; border-left: 0; border-top: 1px solid #e0e0e0; }
        }
        .divider { border-top: 1px solid #ddd; margin: 20px 0; }
        .video-section { margin-top: 20px; }
        .video-section h3 { color: #333; margin-bottom: 15px; font-size: 16px; }
        .video-image { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .video-summary { font-size: 12px; color: #666; line-height: 1.4; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="navbar">
          <img src="/transparent-logo.png" alt="Newsletter SaaS Logo" class="logo">
          <div class="nav-links">
            <a href="#intro">Intro</a>
            <a href="#key-points">Key Points</a>
            <a href="#deep-dive">Deep Dive</a>
            <a href="#conclusion">Conclusion</a>
          </div>
        </div>
        <div class="banner">
          <img src="/growth-loop-visual.png" alt="Infinity loop with arrows">
        </div>
        
        <!-- Bulletproof Background Image -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td background="/subtle-texture-pattern.png" bgcolor="#ffffff" valign="top">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px;">
                <v:fill type="tile" src="/subtle-texture-pattern.png" color="#ffffff" />
                <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
              <![endif]-->
              <div>
                <div class="main-content">
                  <div class="content">
                    <h1 id="intro" style="color: #ca9b07;">Building Sustainable Growth Loops</h1>
                    <h3>The Engine of Modern Growth</h3>
                    <p>Forget one-off marketing campaigns. The most successful products today build growth directly into their DNA through self-sustaining loops. A growth loop occurs when a user's action generates a new user, creating a compounding cycle of acquisition. This is the engine behind the explosive growth of companies like Dropbox, Slack, and Pinterest, and it's a model you can build too.</p>
                    <h2 id="key-points" style="color: #ca9b07; border-bottom: 2px solid #eeeeee; padding-bottom: 5px;">The Four Stages of a Loop</h2>
                    <table class="key-points-table" role="presentation">
                      <tr>
                        <td class="icon"><img src="/user-plus-icon.png" alt="Acquisition Icon" width="40"></td>
                        <td><strong>Acquisition:</strong> A new user discovers and signs up for your product through an output generated by an existing user.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/lightbulb-icon.png" alt="Activation Icon" width="40"></td>
                        <td><strong>Activation:</strong> The new user experiences the core value of your product, reaching the "aha!" moment that makes them stick around.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/share-icon.png" alt="Referral Icon" width="40"></td>
                        <td><strong>Referral:</strong> The activated user performs an action that generates an output, such as sharing content or inviting a colleague.</td>
                      </tr>
                      <tr>
                        <td class="icon"><img src="/dollar-circle-icon.png" alt="Revenue Icon" width="40"></td>
                        <td><strong>Revenue:</strong> As the loop spins, a percentage of users convert to paying customers, funding further product improvements.</td>
                      </tr>
                    </table>
                    <h3 id="deep-dive">A Cohesive System</h3>
                    <p>The magic of a growth loop is that it combines product, marketing, and monetization into a single system. To design one, start by identifying your core product value. What is the one action that makes your product indispensable? Then, brainstorm how that action can naturally create an output that is valuable to both the existing user and a potential new user. For example, sharing a design in Figma is useful for collaboration and also exposes Figma to new people.</p>
                    <p id="conclusion" style="font-weight: bold; font-style: italic; margin-top: 30px;">Stop chasing customers and start building a product that brings them to you.</p>
                  </div>
                  <div class="sidebar">
                    <h3>Helpful Links</h3>
                    <div class="link-item">
                      <a href="#">Growth Loop Playbook</a>
                      <p>Step-by-step guide to designing and implementing viral growth mechanisms.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Analytics for Growth</a>
                      <p>Essential metrics and tools for measuring your growth loop performance.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">Case Study: Dropbox</a>
                      <p>How Dropbox built referral rewards into their core product experience.</p>
                    </div>
                    <div class="link-item">
                      <a href="#">A/B Testing Framework</a>
                      <p>Systematic approach to optimizing each stage of your growth funnel.</p>
                    </div>
                    <div class="divider"></div>
                    <div class="video-section">
                      <h3>Watch Video</h3>
                      <img src="/growth-loop-strategy.png" alt="Growth Loop Strategy Session" class="video-image">
                      <p class="video-summary">18-minute strategy session analyzing Dropbox, Slack, and Notion's viral mechanics.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
        </table>
        <!-- /Bulletproof Background Image -->

        <div class="footer">
          <p>Newsletter SaaS Inc. &copy; 2024</p>
          <p><a href="#">Unsubscribe</a> | <a href="#">View in browser</a></p>
        </div>
      </div>
    </body>
    </html>
    `,
  },
]
