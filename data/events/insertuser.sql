insert into [stk].[dbo].[UsersP1]
([Login],[Password],[Acces]) 
values(@Login,@Password,@Acceskey)
select SCOPE_IDENTITY() as iduser