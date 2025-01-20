

### Project Requirements for the Next.js App

0. Please build the UI just like the image that was provided to you.
   Please write a nextjs app that has the following features:

1. **General Guidelines**
   - Follow the `.cursorrules` file for consistent coding practices.
   - Use **TypeScript** for type safety.
   - Implement modular, reusable components and adhere to clean code principles.
   - Enforce consistent formatting and code quality with **ESLint** and **Prettier**.

2. **Authentication**
   - Use **Supabase authentication** for user login and management.
   - Secure credentials in an `.env` file to protect sensitive data.
   - Protect all pages except the home page (dashboard) by requiring user authentication. Redirect unauthenticated users to the login page.
   - Include a "Sign Out" button to clear the authentication session.

3. **User Interface**
   - Ensure a **responsive layout** optimized for all screen sizes (desktop, tablet, mobile).
   - The home page serves as a **dashboard** displaying user-specific data fetched from Supabase.
   - Add a **dark mode toggle**, storing the user’s preference in `localStorage` to persist the setting across sessions.
   - Use **Tailwind CSS** or another utility-first framework for styling.

4. **Database and Backend**
   - Use Supabase as the backend database.
   - Optimize database queries for efficiency and minimize excessive data reads.

5. **Routing**
   - Use **Next.js dynamic routing** for page creation.
   - Protect authenticated routes with middleware or a higher-order component (HOC).
   - Implement a custom 404 page for non-existent routes.

6. **Pages**
   - **Home Page (Dashboard):**
     - Display a welcome message with the user’s name.
     - Show relevant user-specific statistics or information.
   - **Feature-Rich CRUD Page for `requesterrors` Table:**
     - Build a professional-looking data grid with the following capabilities:
       - Display paginated data, reading only one page worth of records at a time from Supabase.
       - Support server-side sorting, filtering, and pagination to minimize unnecessary data reads.
       - Include an **"Update Active" column**:
         - Add a button in each row that, when clicked, updates the `active` column to `0` for the respective record in Supabase.
         - Ensure the grid reflects the change immediately without requiring a page reload.
       - Provide columns for all table fields: `id`, `region`, `type`, `casenumber`, `sourcefilename`, `errormessage`, `created_at`, and `active`.
     - Add a search bar to filter records by `casenumber`, `region`, or `type`.
     - Include error handling for CRUD operations, with visual feedback (e.g., success/error toasts).
   - **Login Page:**
     - Allow email/password authentication.
     - Add a "Forgot Password" feature using Supabase's password reset API.
   - **Settings Page:**
     - Allow users to update their profile information.
     - Provide a dark mode toggle linked to `localStorage`.

7. **State Management**
   - Use React Context API or **Redux Toolkit** to manage global states, such as user authentication and dark mode preferences.

8. **Testing**
   - Write unit tests and integration tests using **Jest** or **Testing Library**.
   - Ensure proper testing of CRUD operations and protected routes.

9. **Deployment**
   - Deploy the application to **Vercel** or another Next.js-compatible platform.
   - Use environment variables for production securely.

10. **Documentation**
    - Include a `README.md` file with:
      - Steps to set up the project locally.
      - Instructions for adding Supabase credentials in the `.env` file.
      - Guidance on building, running, and deploying the app.
    - Add inline code comments to explain complex logic or decisions.

---

### Additional Notes for CRUD Functionality:
- The **data grid** should leverage a professional UI library for advanced features and a polished appearance.
- Server-side functionality for sorting, filtering, and pagination should be implemented in Supabase queries using SQL or Supabase's query builder.
- When the "Update Active" button is clicked:
  - Execute a Supabase `update` query for the respective record.
  - Show a visual indicator (e.g., spinner) while the operation is in progress.
  - Refresh the grid automatically upon successful update to reflect the change.

