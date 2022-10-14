# MatchWithLvasgn Formatting

## Fails because no tests are written

Before:

```ruby
/(?<match>bar)/ =~ "bar"
```

After:

```ruby
/(?<match>bar)/ =~ "bar"
```
