

export default function Certificate({ certificate }) {
  return (
    <div className="border-4 border-gray-950 dark:border-gray-400 rounded-lg p-8 dark:bg-gray-900 bg-gray-100 shadow-2xl w-[95%] max-w-3xl mx-auto my-5 text-center space-y-6">
  <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white uppercase">
    Certificate of Achievement
  </h1>

  <p className="text-lg text-gray-700 dark:text-gray-300">This is proudly presented to</p>

  <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 capitalize">{certificate.name}</h2>

  <p className="text-lg text-gray-700 dark:text-gray-300">
    for successfully completing the programme:
  </p>

  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 italic">{certificate.programme}</h3>

  <div className="space-y-2 text-gray-600 dark:text-gray-400 pt-4">
    <div><span className="font-semibold">Student ID:</span> {certificate.studentNumber}</div>
    <div><span className="font-semibold">Date Completed:</span> {certificate.dateCompleted}</div>
    <div><span className="font-semibold">Certificate Code:</span> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{certificate.certificateCode}</code></div>
  </div>

  <div className="flex justify-between items-center pt-6">
    <div className="text-sm text-gray-500 dark:text-gray-400 italic">Authorized Signature</div>
    <div className="text-sm text-gray-500 dark:text-gray-400 italic">Date: {certificate.dateCompleted}</div>
  </div>
</div>

  )
}
