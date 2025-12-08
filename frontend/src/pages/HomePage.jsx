import { SignedIn ,SignInButton,SignedOut,UserButton,SignOutButton} from '@clerk/clerk-react'
function HomePage() {
  return (
    <>
       <SignedOut>
        <SignInButton mode='modal'>
         <button className='btn btn-secondary'>Sign-up please</button> 
         </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <UserButton/>
    </>
  )
}

export default HomePage