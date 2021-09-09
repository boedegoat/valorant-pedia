const Wrapper = ({ children, className }) => {
  return (
    <div className={`px-5 max-w-7xl mx-auto ${className ? className : ''}`}>
      {children}
    </div>
  )
}

export default Wrapper
