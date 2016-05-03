/* @flow */
import React from 'react';
import {Entity} from 'draft-js';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock} from 'draft-js';

// TODO: Use a more specific type here.
type ReactNode = any;

type Props = {
  children: ReactNode,
  entityKey: string,
};

type EntityRangeCallback = (start: number, end: number) => void;

const imageStyle = {
  display: 'inline-block',
  verticalAlign: 'bottom',
};

function Image(props_: Props): React.Element {
  const {src, width, height} = Entity.get(props_.entityKey).getData();
  const style = {...imageStyle, width, height, backgroundImage: `url(${src})`, letterSpacing: width, lineHeight: height + 'px', fontSize: height};
  return (
    <span style={style}>{props_.children}</span>
  );
}

function findImageEntities(contentBlock: ContentBlock, callback: EntityRangeCallback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === ENTITY_TYPE.IMAGE
    );
  }, callback);
}

export default {
  strategy: findImageEntities,
  component: Image,
};
