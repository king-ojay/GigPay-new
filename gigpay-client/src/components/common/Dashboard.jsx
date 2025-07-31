const Dashboard = () => {
    const token = localStorage.getItem("token");
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        {token ? (
          <p className="text-green-600 mt-4">You are logged in 🎉</p>
        ) : (
          <p className="text-red-600 mt-4">No token found. Please login.</p>
        )}
      </div>
    );
  };
  
  export default Dashboard;
  