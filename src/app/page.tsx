import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({cookies})

  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div>
      {session ? <div>ログイン済</div> : <div>未ログイン</div>}
    </div>
  )
}

export default Home