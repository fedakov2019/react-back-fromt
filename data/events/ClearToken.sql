update [stk].[dbo].[UsersP1] set [RefrechToken]=null
where [RefrechToken]=@token
select 0 resultCode