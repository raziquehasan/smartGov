import { create } from 'zustand';

export const useIssueStore = create((set) => ({
  issues: [
    { id: "TKT-101", citizen: "Sadiya Shaikh", issue: "Broken Streetlight", date: "Feb 22", status: "Pending", category: "Street Lights" },
    { id: "TKT-102", citizen: "Rahul V.", issue: "Large Pothole - Ward 5", date: "Feb 23", status: "In Review", category: "Roads & Potholes" },
  ],

  // Naya issue add karne ke liye function
  addIssue: (newIssue) => set((state) => ({ 
    issues: [newIssue, ...state.issues] 
  })),

  // Status update karne ke liye (Officer ke liye)
  updateIssueStatus: (id, newStatus) => set((state) => ({
    issues: state.issues.map((issue) => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    )
  })),
}));