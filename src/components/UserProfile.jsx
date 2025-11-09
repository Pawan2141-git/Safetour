import UserProfileTailwind from './UserProfileTailwind';

// Legacy CSS-first profile replaced by the Tailwind + Framer Motion implementation.
// We keep this module as a thin forwarder so existing imports that reference
// `UserProfile` continue to resolve to the new implementation.
export default UserProfileTailwind;
