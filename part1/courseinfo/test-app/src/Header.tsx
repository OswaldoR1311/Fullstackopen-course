interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps): React.JSX.Element => {
  return <h1>{props.name}</h1>
}

export default Header