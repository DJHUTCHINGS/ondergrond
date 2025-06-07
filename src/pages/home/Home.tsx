const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6"
        data-testid="home-main-header"
        >
          Welcome to the Ondergrond
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
     Some description
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">box1</h3>
            <p className="text-gray-600">
         Some stuff
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">box2</h3>
            <p className="text-gray-600">
          Some stuff
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">box3</h3>
            <p className="text-gray-600">
        Some stuff
            </p>
          </div>
        </div>
      </div>
      <div className="bg-red-500 text-white p-4">
some kind of alert idk
</div>
    </div>
  )
}

export default Home