export default function NavItem({ href, icon: Icon, label }) {
    return (
      <li>
        <a href={href} className="relative flex justify-center items-center h-12 w-full text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all group">
          <Icon className="text-2xl" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            {label}
          </span>
        </a>
      </li>
    );
  }