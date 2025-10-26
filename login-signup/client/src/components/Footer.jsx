export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 text-center border-t border-gray-800">
      <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
      <p>
        Built with <span className="text-indigo-400 font-semibold">React</span> &{" "}
        <span className="text-indigo-400 font-semibold">Node.js</span>
      </p>
    </footer>
  );
}
