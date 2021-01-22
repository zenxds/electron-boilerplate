import React from 'react'

declare global {
  type IReactComponent<P = any> = React.StatelessComponent<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>

  interface LooseObject {
    [key: string]: any
  }

  interface Dictionary<T> {
    [key: string]: T
  }

  interface GenericFunc<T> {
    (...args: any[]): T
  }
}
