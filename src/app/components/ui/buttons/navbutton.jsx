export default function NavButton({ icon: Icon, hasNotification, onClick }) {
    return (
      <button 
        onClick={onClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
      >
        <Icon className="w-5 h-5 text-gray-600" />
        {hasNotification && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>
    );
  }