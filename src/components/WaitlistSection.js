// // src/components/WaitlistSection.js
// import React, { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { addToWaitlist } from "../utils/supabase";

// export default function WaitlistSection() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { currentUser } = useAuth();

//   // Pre-fill email if user is logged in
//   React.useEffect(() => {
//     if (currentUser && currentUser.email) {
//       setEmail(currentUser.email);
//     }
//   }, [currentUser]);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!email) {
//       setError("Please enter your email");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // Add to waitlist in database
//       const { error: dbError } = await addToWaitlist(
//         email,
//         currentUser?.uid || null
//       );

//       if (dbError) throw dbError;

//       setSubmitted(true);
//     } catch (error) {
//       setError("Failed to join waitlist. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (submitted) {
//     return (
//       <div className="waitlist-success">
//         <h3>🎉 You're on the list!</h3>
//         <p>We'll notify you when we launch. Thanks for your interest!</p>
//       </div>
//     );
//   }

//   return (
//     <section id="waitlist" className="waitlist-section">
//       <h2>Join the Waitlist</h2>
//       <p>Be the first to know when we launch</p>

//       <form onSubmit={handleSubmit} className="waitlist-form">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           disabled={!!currentUser?.email}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Joining..." : "Join Waitlist"}
//         </button>
//       </form>

//       {error && <div className="error-message">{error}</div>}
//     </section>
//   );
// }

// src/components/WaitlistSection.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { addToWaitlist } from "../utils/supabase";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Add to waitlist with duplicate check
      const { error: dbError } = await addToWaitlist(
        email,
        currentUser?.uid || null
      );

      if (dbError) {
        setError(dbError.message); // Shows "You have already joined the waitlist."
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="waitlist-success">
        <h3>🎉 You're on the list!</h3>
        <p>We'll notify you when we launch. Thanks for your interest!</p>
      </div>
    );
  }

  return (
    <section id="waitlist" className="waitlist-section">
      <h2>Join the Waitlist</h2>
      <p>Be the first to know when we launch</p>

      <form onSubmit={handleSubmit} className="waitlist-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!currentUser?.email}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </section>
  );
}
