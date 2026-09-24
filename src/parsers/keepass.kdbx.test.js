/**
 * @jest-environment node
 */
import * as kdbxweb from 'kdbxweb'

import { decryptKeePassKdbx, MAX_KDBX_INFLATED_BYTES } from './keepass'

const makeKdbx = async (version, notes) => {
  const db = kdbxweb.Kdbx.create(
    new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString('pw')),
    'db'
  )
  db.setVersion(version)
  if (version === 4) db.setKdf(kdbxweb.Consts.KdfId.Aes)
  db.header.keyEncryptionRounds = 1
  const entry = db.createEntry(db.getDefaultGroup())
  entry.fields.set('Title', 'Big')
  entry.fields.set('Notes', notes)
  return db.save()
}

describe.each([3, 4])('decryptKeePassKdbx KDBX%i gzip payload', (version) => {
  it('loads a normal database', async () => {
    const root = await decryptKeePassKdbx(await makeKdbx(version, 'hi'), 'pw')
    expect(root.entries[0].fields.get('Notes')).toBe('hi')
  })

  it('rejects a payload that inflates past the cap', async () => {
    const file = await makeKdbx(
      version,
      'A'.repeat(MAX_KDBX_INFLATED_BYTES + 1)
    )
    await expect(decryptKeePassKdbx(file, 'pw')).rejects.toThrow(
      'too large to import'
    )
  }, 60_000)
})
