import React, { useState, useRef } from "react";
import { Save } from "lucide-react";

// NOTE: Tailwind CSS must be configured in your React project.

export default function ResumeBuilder() {
  const [profile, setProfile] = useState({ fullName: "", title: "", email: "", phone: "", summary: "" });
  const [education, setEducation] = useState([{ id: Date.now(), school: "", degree: "", from: "", to: "", details: "" }]);
  const [experience, setExperience] = useState([{ id: Date.now() + 1, company: "", role: "", from: "", to: "", details: "" }]);
  const [skills, setSkills] = useState([""]);
  const previewRef = useRef(null);

  const BACKEND_URL = "http://localhost:5000/api/resume"; // Change to your backend endpoint

  const updateProfile = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));
  const addEducation = () => setEducation(prev => [...prev, { id: Date.now(), school: "", degree: "", from: "", to: "", details: "" }]);
  const updateEducation = (id, field, value) => setEducation(prev => prev.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  const removeEducation = id => setEducation(prev => prev.filter(e => e.id !== id));

  const addExperience = () => setExperience(prev => [...prev, { id: Date.now(), company: "", role: "", from: "", to: "", details: "" }]);
  const updateExperience = (id, field, value) => setExperience(prev => prev.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  const removeExperience = id => setExperience(prev => prev.filter(e => e.id !== id));

  const addSkill = () => setSkills(prev => [...prev, ""]);
  const updateSkill = (index, value) => setSkills(prev => prev.map((s, i) => (i === index ? value : s)));
  const removeSkill = index => setSkills(prev => prev.filter((_, i) => i !== index));

  const submitToBackend = async () => {
    const resumeData = { profile, education, experience, skills };

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const data = await response.json();
      alert(`Server Response: ${data.message || "Resume submitted successfully!"}`);
    } catch (error) {
      console.error("Error submitting resume:", error);
      alert("Failed to submit resume data to backend.");
    }
  };

  const exportToPDF = () => {
    window.print(); // Simplified export: use browser print-to-PDF
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* Form column */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resume Builder — Editor</h2>

          <section className="mb-4">
            <label className="block text-sm font-medium">Full name</label>
            <input value={profile.fullName} onChange={e => updateProfile("fullName", e.target.value)} className="mt-1 w-full p-2 rounded border" placeholder="Alex Johnson" />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input value={profile.title} onChange={e => updateProfile("title", e.target.value)} className="p-2 rounded border" placeholder="Product Engineer" />
              <input value={profile.email} onChange={e => updateProfile("email", e.target.value)} className="p-2 rounded border" placeholder="email@example.com" />
            </div>
            <input value={profile.phone} onChange={e => updateProfile("phone", e.target.value)} className="mt-2 w-full p-2 rounded border" placeholder="+91 98765 43210" />
            <textarea value={profile.summary} onChange={e => updateProfile("summary", e.target.value)} className="mt-2 w-full p-2 rounded border" placeholder="Professional summary (2–3 lines)" />
          </section>

          <section className="mb-4">
            <h3 className="font-medium">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mt-2 border rounded p-2">
                <input value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} placeholder="Company" className="w-full p-1 border rounded mb-2" />
                <input value={exp.role} onChange={e => updateExperience(exp.id, "role", e.target.value)} placeholder="Role" className="w-full p-1 border rounded mb-2" />
                <div className="flex gap-2">
                  <input value={exp.from} onChange={e => updateExperience(exp.id, "from", e.target.value)} placeholder="From" className="p-1 border rounded w-1/2" />
                  <input value={exp.to} onChange={e => updateExperience(exp.id, "to", e.target.value)} placeholder="To" className="p-1 border rounded w-1/2" />
                </div>
                <textarea value={exp.details} onChange={e => updateExperience(exp.id, "details", e.target.value)} className="mt-2 w-full p-1 border rounded" placeholder="Responsibilities / Achievements" />
                <button onClick={() => removeExperience(exp.id)} className="text-sm text-red-600 mt-1">Remove</button>
              </div>
            ))}
            <button onClick={addExperience} className="px-3 py-1 mt-2 rounded bg-indigo-600 text-white text-sm">Add experience</button>
          </section>

          <section className="mb-4">
            <h3 className="font-medium">Education</h3>
            {education.map(ed => (
              <div key={ed.id} className="mt-2 border rounded p-2">
                <input value={ed.school} onChange={e => updateEducation(ed.id, "school", e.target.value)} placeholder="School / University" className="w-full p-1 border rounded mb-2" />
                <input value={ed.degree} onChange={e => updateEducation(ed.id, "degree", e.target.value)} placeholder="Degree" className="w-full p-1 border rounded mb-2" />
                <div className="flex gap-2">
                  <input value={ed.from} onChange={e => updateEducation(ed.id, "from", e.target.value)} placeholder="From" className="p-1 border rounded w-1/2" />
                  <input value={ed.to} onChange={e => updateEducation(ed.id, "to", e.target.value)} placeholder="To" className="p-1 border rounded w-1/2" />
                </div>
                <textarea value={ed.details} onChange={e => updateEducation(ed.id, "details", e.target.value)} className="mt-2 w-full p-1 border rounded" placeholder="Details / GPA" />
                <button onClick={() => removeEducation(ed.id)} className="text-sm text-red-600 mt-1">Remove</button>
              </div>
            ))}
            <button onClick={addEducation} className="px-3 py-1 mt-2 rounded bg-indigo-600 text-white text-sm">Add education</button>
          </section>

          <section className="mb-4">
            <h3 className="font-medium">Skills</h3>
            {skills.map((s, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input value={s} onChange={e => updateSkill(i, e.target.value)} className="flex-1 p-1 border rounded" placeholder="JavaScript, React..." />
                <button onClick={() => removeSkill(i)} className="text-red-600 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={addSkill} className="px-3 py-1 mt-2 rounded bg-indigo-600 text-white text-sm">Add skill</button>
          </section>

          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={exportToPDF} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded"><Save size={16} /> Export / Print PDF</button>
            <button onClick={submitToBackend} className="px-4 py-2 bg-blue-600 text-white rounded">Submit to Backend</button>
          </div>
        </div>

        {/* Preview column */}
        <div className="col-span-12 lg:col-span-7">
          <div ref={previewRef} className="bg-white rounded-2xl shadow p-6 min-h-[700px]">
            <h1 className="text-2xl font-bold">{profile.fullName || "Your Name"}</h1>
            <p className="text-sm text-gray-600">{profile.title || "Job Title"}</p>
            <p className="text-sm text-gray-600">{profile.email} | {profile.phone}</p>

            <div className="mt-4">
              <h4 className="font-semibold">Summary</h4>
              <p className="text-sm text-gray-700">{profile.summary || "A concise professional summary."}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Experience</h4>
                {experience.map(exp => (
                  <div key={exp.id} className="mt-2">
                    <div className="font-medium">{exp.role || "Role"} — <span className="text-sm text-gray-600">{exp.company || "Company"}</span></div>
                    <div className="text-sm text-gray-600">{exp.from} — {exp.to}</div>
                    <div className="text-sm text-gray-700">{exp.details}</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold">Education</h4>
                {education.map(ed => (
                  <div key={ed.id} className="mt-2">
                    <div className="font-medium">{ed.school || "University"} — <span className="text-sm text-gray-600">{ed.degree || "Degree"}</span></div>
                    <div className="text-sm text-gray-600">{ed.from} — {ed.to}</div>
                    <div className="text-sm text-gray-700">{ed.details}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.filter(Boolean).map((s, i) => (
                  <span key={i} className="text-sm px-2 py-1 border rounded">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}