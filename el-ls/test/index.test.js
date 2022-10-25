import { assert, describe, it }  from 'vitest'
// import { assert } from 'assert'
import { parseArgs } from '../bin/parseArgs.js'
import { getFileType } from '../bin/getFileType.js'
import { getFileUser } from '../bin/getFileUser.js'
import { getFileSizeAndDate } from '../bin/getFileSizeAndDate.js'
import { auth } from '../bin/auth.js'

describe('el-ls', function () {
  describe('parseArgs', function () {
    it('args test', function () {
      const { isAll, isList, args } = parseArgs()
      console.log(args)
      assert.equal(isAll, false)
      assert.equal(isList, false)
      assert.equal(args.length, 0)
    })
  })
  describe('getFileType', function () {
    it('file current user', function () {
      const stat = { uid: 501, gid: 20 }
      const user = getFileUser(stat)
      assert.equal(user, 'chenxuehai  staff')
    })
  })
})
 