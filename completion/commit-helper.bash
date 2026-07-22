# bash completion for commit-helper
_commit_helper_completions()
{
  local cur prev opts
  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  prev="${COMP_WORDS[COMP_CWORD-1]}"
  opts="new validate changelog config --help --version"

  if [[ ${cur} == -* ]] ; then
    COMPREPLY=( $(compgen -W "--help --version" -- ${cur}) )
    return 0
  fi

  COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
  return 0
}
complete -F _commit_helper_completions commit-helper
