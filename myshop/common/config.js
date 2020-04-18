var obj = {}
obj.alipayOptions = {
    // 沙箱模拟支付

    app_id: '2016080800193883',  //appid
    // 发开者的私钥
    appPrivKeyFile: "MIIEpQIBAAKCAQEA6Yhln7ZC8UP2Lk/Cqqms7jw22t2I3GHc0DISd2AR63ipUCv9u+tM0aBpMfftL/FVmUEA1a6w3OHm9oIUmy6B/udMSFr+zcNQCFUl9nKTDdecHBL1gzefVC2Re/xeXwT4MiJ/xi1EzIkuqX05NXRI8hsvv6eaEZrat+GkQdn2o8yS38UxfubTy2yW1pt7Iq94Ux5wYHgJYZ6zy0l7pXsxgffhGBE0D+0On/f8r4AMSfNxdMhg1jxlBoVBZ7HPLQEFFNhrAHDRs2eb80Qyy+M245hda5bzsSfp4Uq8SHDLJQO6QHYDYMeuO3AdQLPe1DGO1O1/vY15XSL8PTgIOtgbOwIDAQABAoIBAQDm44buCApZdUMBeLRTfVxPUlM9wsfcdBkX8lmVkvNEptBnRocf8zzJCNrYn3Hu86EY207S9VtBl0t9rxBmeO3nspEV/HltwEvxYRYeehrwFZrvmsMHz8eEN2Veex5mvYgSMU+5BOq/emYbBoa4VdcFH2HvD+rguwTBxqJaxP/34pg+UG6CQg/wmV/fK/2V8LjVGo6gB469rPHkx58qjYxw+MnNe6Cr91lRb/O/Jbg2HtE3vssvwjt+v3pAdAKyFcGm5qkAm9flNcQBgAw6FJUcQgUE2svAekDiAXTOoV5r6M+BnrWwhqa2qLNCkUwNdgpVZbmwRBn5ZIx33WzAD+ihAoGBAPnYnuRbdXv1JvVeAU5LAKmH0NwNGrbo+f6qZdVU84fq380xR/1oXehdAy+6KtcL6GPVPrUxyEH8+W5GZy0v/lRvo4abd8wta5bmLOEpGzTguZZKE9ZQCU0r987fID5x8V+KI27sXaZU1+hLekxJnVQ5abiH0MucMLQUFk+cJv4xAoGBAO9I6fu5F/Dci3kpYP+VwKm0HhQaovA0+yvUwMFdp/EHWso6Q2k0SHVcH2AB3wjTpAobzViZiBqUFNi+nL2Ajf8ivfIyqIoPkJbf6oExTr7SjMiEp0Rq18A86AkyqCpA1nf0iXH0UOfvw1TdT8xA3sidHlySEynYpFi2oWaTurkrAoGBAN6z4UXp5Dn+1qAmEAHqxwdWYayUHbjmyFfhKW5UD9OaX602fVX7HqHNrtZvGlqfaaD7Zq76VefEB83tAXD887Xt4RROJiWgYuOZ/m0hR/gFTEgTdcU1iGT6iSQkLUicJiwkJNtt4zgtLlsIVFYF1DBMENmEbm/fpGYP9ac2qGcxAoGBAJ7UCiPBF2gULCvvUGg2EZ1TZke36oGA2Vudq5huPyRY2mWzSL2TK6lizZyfgVjNimv/Sk1OE654rmG0HDwZEafRer1B7Oc/L51F4dWBUiCNh08t5g0e0jjS9L3uNvtc8D7NPVI7dlyNpF03TVlpkbcdu2J8v2WeXHBaQUXiNyXjAoGAT+WsH1fnW6PmuwalI0zu8FbfGqj+GQwpWBExvHR1Lk58DN9FWX3xMBU1HiLbzCwl6/SJwrqbS+io07cswabbsYrC0BxJIBgy8g+K2yAV+yOKEEtN2xELo3mwmiGOaXJWmgNXTdakFCndUHGB6dAQU9S8MSZ7Z7BuOyOkH+5qkxc=",
    // 支付宝的公钥
    alipayPubKeyFile: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqT1H/mqZY5/2BT4ilZK5gVzcBbZRtCqQqCwkGxmVH4SOQZDlN7dIzgY2Q33e5Nu2Bgr9BGN+qnGRb2ozRg56aq2jE7XvwygZKi5Pqp88JgKq9rnh+1opCz+y0dekxigVgr954cXaBNADWLQl7ji2kHgJWV0Ji3wvELXhR6YE9uifIDxXpjHBtqtdziyWQazVNgnDqiTgC7Z/q6dlq4CIIz7iPJJmBTNh4NE4ISZGplQ6oB8fq8lHYxa6fJqbPVYT9nnl6ZfRsIyqVMoVP8yXgfzuTYI9gtkfRDYX7C6DkIqdEeVxSp6iv0UaKTLu1gTm4WrTOmE18RG4PZb0j6imJQIDAQAB"
}

obj.alipayBasicParams = {
    return_url: 'http://app.yiqigoumall.com/success', //支付成功返回地址
    notify_url: 'http://app.yiqigoumall.com/alipay/alipayNotify' //支付成功异步通知地址，更新订单路由
}

module.exports = obj;