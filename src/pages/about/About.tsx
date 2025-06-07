const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Ondergrond</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Ondergrond (Dutch for "underground" or "foundation") represents the underlying 
          platform upon which I'm gonna add more stuff
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Technical Stack</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <ul className="space-y-2 text-gray-700">
            <li><strong>Frontend:</strong> React 18, TypeScript, Vite</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>Testing:</strong> Vitest, React Testing Library</li>
            <li><strong>Hosting:</strong> AWS S3 + CloudFront</li>
            <li><strong>Infrastructure:</strong> AWS CDK</li>
            <li><strong>CI/CD:</strong> GitHub Actions</li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Future Plans</h2>
        
        <p className="text-gray-600 mb-4">
          This platform is designed to grow. Planned features include:
        </p>
        
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Blog functionality with markdown support?</li>
          <li>User authentication and accounts?</li>
          <li>Project sections?</li>
          <li>Contact forms with serverless backend?</li>
          <li>Performance monitoring and analytics?</li>
        </ul>
      </div>
    </div>
  )
}

export default About