export const useThemeClasses = (theme:string) => {
  return {
    bgClass: theme === 'dark' 
      ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' 
      : 'bg-gradient-to-r from-blue-50 via-white to-blue-50',
    textClass: theme === 'dark' ? 'text-white' : 'text-gray-800',
    borderClass: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    buttonClass: theme === 'dark'
      ? 'bg-black hover:from-grey-700 hover:to-grey-400 text-white'
      : 'bg-white hover:from-blue-600 hover:to-grey-100 text-black',
    cityDisplayClass: theme === "dark" ? 'bg-gray-700/50 text-blue-300' : 'bg-blue-50 text-blue-700',
    emptyStateClass:theme === "dark" 
    ? 'bg-gray-800/50 text-gray-400 border-gray-700' 
    : 'bg-white/70 text-gray-500 border-gray-300',
  cardBgClass : theme === "dark" ? 'bg-gray-700/50' : 'bg-white/80',
  textSecondaryClass : theme === "dark" ? 'text-gray-300' : 'text-gray-600',
  iconBgClass : theme === "dark" ? 'bg-blue-900/30' : 'bg-blue-100'

    
  };
};