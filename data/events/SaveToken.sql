update [stk].[dbo].[UsersP1] set
      [RefrechToken]=@token
  where id=@id
  select @token as token