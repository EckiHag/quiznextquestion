import React from "react"
import Link from "next/link"

const Page: React.FC = () => {
  return (
    <div>
      <h1>Seitenliste</h1>
      <ul>
        <li>
          <Link href="/thesomat">
            <a>Thesomat</a>
          </Link>
        </li>
        <li>
          <Link href="/provakomat">
            <a>Provakomat</a>
          </Link>
        </li>
        <li>
          <Link href="/kirchenjahr">
            <a>Kirchenjahr</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Page
